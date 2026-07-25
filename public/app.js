const tasks = {
  question: { placeholder: "Example: What is the capital of France?", styles: [
    ["Quick fact", "Answer this question in one clear sentence, then add one helpful detail."],
    ["Explain simply", "Explain this question for a beginner using plain language and a short example."],
    ["Study answer", "Give an accurate answer, define key terms, and list two facts to remember."]
  ]},
  summarize: { placeholder: "Paste text or an article excerpt to summarize…", styles: [
    ["Brief", "Summarize this text in 3 concise bullet points."],
    ["Structured", "Provide the main idea, key points, and conclusion from this text."],
    ["Student notes", "Turn this text into easy revision notes with important terms highlighted."]
  ]},
  creative: { placeholder: "Example: Write a hopeful short poem about learning from failure.", styles: [
    ["Imaginative", "Write an original, vivid piece based on the request, using sensory detail."],
    ["Constrained", "Create the requested text while following the stated tone, length, and format."],
    ["Polished", "Draft an engaging version, then end with a memorable final line."]
  ]},
  advice: { placeholder: "Example: How can I prepare effectively for exams next month?", styles: [
    ["Action plan", "Give five practical steps that are realistic for this situation."],
    ["Supportive", "Offer warm, encouraging advice with a small first step I can start today."],
    ["Compare options", "Suggest a few options, explain the trade-offs, and recommend a starting point."]
  ]}
};
let selected = "question"; let lastRequest = ""; let lastAnswer = "";
const $ = s => document.querySelector(s);
function render() {
  const task = tasks[selected];
  $("#userInput").placeholder = task.placeholder;
  $("#promptStyle").innerHTML = task.styles.map(([name], i) => `<option value="${i}">${name}</option>`).join("");
  $("#promptCards").innerHTML = task.styles.map(([name, copy], i) => `<article class="prompt-card"><span>0${i + 1}</span><b>${name}</b><p>${copy}</p></article>`).join("");
}
document.querySelectorAll(".task").forEach(button => button.addEventListener("click", () => { selected = button.dataset.task; document.querySelectorAll(".task").forEach(b => b.classList.toggle("active", b === button)); render(); }));
$("#submitBtn").addEventListener("click", async () => {
  const input = $("#userInput").value.trim(); if (!input) { $("#userInput").focus(); return; }
  const style = tasks[selected].styles[$("#promptStyle").value][0]; lastRequest = input;
  $("#submitBtn").disabled = true; $("#submitBtn").textContent = "Thinking…"; $("#answer").textContent = "Creating your response…"; $("#feedback").classList.add("hidden");
  try {
    const res = await fetch("/api/assist", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ functionName:selected, userInput: `${style} approach: ${input}` }) });
    const data = await res.json(); if (!res.ok) throw new Error(data.error); lastAnswer = data.answer; $("#answer").textContent = data.answer; $("#modeBadge").textContent = data.mode.includes("AI") ? "AI" : "DEMO"; $("#feedback").classList.remove("hidden");
  } catch (error) { $("#answer").textContent = `Something went wrong: ${error.message}`; }
  finally { $("#submitBtn").disabled = false; $("#submitBtn").innerHTML = "Ask PromptPilot <span>→</span>"; }
});
document.querySelectorAll("[data-rating]").forEach(button => button.addEventListener("click", async () => {
  const rating = button.dataset.rating; try { await fetch("/api/feedback", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({rating, functionName:selected, request:lastRequest, response:lastAnswer}) }); $("#feedbackStatus").textContent = rating === "yes" ? "Thanks — this prompt style is working." : "Thanks — try a different prompt style for a refined response."; } catch { $("#feedbackStatus").textContent = "Feedback could not be saved."; }
}));
render();
