const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");
const feedbackFile = path.join(__dirname, "feedback.json");

// Load optional local configuration without adding a dependency.
const envFile = path.join(__dirname, ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const PROMPTS = {
  question: `You are a reliable study assistant. Answer the user's factual question directly. Use simple language, explain unfamiliar terms briefly, and say when a fact may need current verification.`,
  summarize: `You are a precise summarizer. Turn the user's text into a concise, accurate summary. Preserve the main idea, the most important supporting points, and any conclusion. Do not add facts that are not in the source.`,
  creative: `You are a creative writing partner. Create original, vivid writing in the format and tone requested by the user. Follow stated constraints and avoid copying existing works.`,
  advice: `You are a practical coach. Give supportive, actionable advice for the user's situation. Use a short sequence of realistic steps and encourage professional help if the topic involves safety, health, legal matters, or a crisis.`
};

console.log(`PromptPilot provider configuration: OpenRouter=${Boolean(process.env.OPENROUTER_API_KEY)}, OpenAI=${Boolean(process.env.OPENAI_API_KEY)}`);

function send(res, status, body, type = "application/json") {
  res.writeHead(status, { "Content-Type": type });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}

function fallback(functionName, userInput) {
  const clean = userInput.trim();
  if (functionName === "summarize") {
    const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [clean];
    const selected = sentences.slice(0, 3).map(s => s.trim()).filter(Boolean);
    return `Summary\n\n${selected.join(" ")}\n\nKey idea: The text focuses on ${clean.slice(0, 90)}${clean.length > 90 ? "…" : ""}`;
  }
  if (functionName === "creative") {
    return `A small idea began to glow at the edge of the ordinary. ${clean}\n\nBy evening, it had become a path—quiet, curious, and entirely its own. The first step was enough to make the next one possible.`;
  }
  if (functionName === "advice") {
    return `Here is a practical way to approach this:\n\n1. Define the smallest next action related to “${clean}”.\n2. Set aside a focused 25-minute session and remove one distraction.\n3. Review what worked, then adjust your plan for tomorrow.\n\nStart small and build consistency; progress is easier to sustain when the plan is realistic.`;
  }
  const q = clean.toLowerCase();
  if (q.includes("capital of france")) return "The capital of France is Paris.";
  if (q.includes("photosynthesis")) return "Photosynthesis is the process plants use to turn light energy, water, and carbon dioxide into glucose (food), releasing oxygen as a by-product.";
  return `I can help investigate that question. In this offline demo mode, connect an OpenAI API key to receive a model-generated answer for: “${clean}”.`;
}

async function callOpenAI(functionName, userInput) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: PROMPTS[functionName],
      input: userInput
    })
  });
  if (!response.ok) throw new Error(`OpenAI request failed (${response.status})`);
  const data = await response.json();
  return data.output_text || "The model returned no text.";
}

async function callOpenRouter(functionName, userInput) {
  if (!process.env.OPENROUTER_API_KEY) return null;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-OpenRouter-Title": "PromptPilot"
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openrouter/free",
      messages: [
        { role: "system", content: PROMPTS[functionName] },
        { role: "user", content: userInput }
      ]
    })
  });
  if (!response.ok) throw new Error(`OpenRouter request failed (${response.status})`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "The model returned no text.";
}

function serveStatic(req, res) {
  const requested = req.url === "/" ? "/index.html" : req.url;
  const safePath = path.normalize(requested).replace(/^([/\\])+/, "");
  const filePath = path.join(publicDir, safePath);
  if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath)) return send(res, 404, "Not found", "text/plain");
  const ext = path.extname(filePath);
  const types = { ".html": "text/html", ".css": "text/css", ".js": "application/javascript" };
  send(res, 200, fs.readFileSync(filePath), types[ext] || "application/octet-stream");
}

const requestHandler = async (req, res) => {
  if (req.method === "GET") return serveStatic(req, res);
  let raw = "";
  req.on("data", chunk => raw += chunk);
  req.on("end", async () => {
    try {
      const data = JSON.parse(raw || "{}");
      if (req.url === "/api/assist") {
        const { functionName, userInput } = data;
        if (!PROMPTS[functionName] || !String(userInput || "").trim()) return send(res, 400, { error: "Choose a function and enter a request." });
        let answer;
        let mode = "Demo mode";
        try {
          answer = await callOpenRouter(functionName, userInput);
          if (answer) mode = "Free AI mode";
          if (!answer) answer = await callOpenAI(functionName, userInput);
          if (answer && mode !== "Free AI mode") mode = "AI mode";
        }
        catch (error) {
          console.error(`[PromptPilot] AI provider request failed: ${error.message}`);
          answer = `The AI service is unavailable, so the demo response is shown below.\n\n${fallback(functionName, userInput)}`;
        }
        if (!answer) answer = fallback(functionName, userInput);
        return send(res, 200, { answer, mode });
      }
      if (req.url === "/api/feedback") {
        const entries = fs.existsSync(feedbackFile) ? JSON.parse(fs.readFileSync(feedbackFile, "utf8")) : [];
        entries.push({ ...data, recordedAt: new Date().toISOString() });
        fs.writeFileSync(feedbackFile, JSON.stringify(entries, null, 2));
        return send(res, 200, { saved: true });
      }
      send(res, 404, { error: "Not found" });
    } catch (error) { send(res, 500, { error: error.message || "Unexpected server error" }); }
  });
};

if (require.main === module) {
  http.createServer(requestHandler).listen(port, () => console.log(`PromptPilot is running at http://localhost:${port}`));
} else {
  module.exports = requestHandler;
}

