# ✦ PromptPilot

> A simple AI Assistant for answering questions, summarizing text, creating content, and giving practical advice.

## Welcome

PromptPilot is a web-based AI Assistant created for the **AI Assistant Development** prompt-engineering project. It helps users choose the right type of task, select a prompt style, and receive a clear response in one place.

---

## Quick start

### 1. Visit the App

Open [https://promptpilot-six.vercel.app](https://promptpilot-six.vercel.app) in your web browser.

You can access the assistant from any device without needing to run any code locally!

---

## Using the assistant

PromptPilot follows a simple three-step flow:

1. **Choose a task** — select the type of help you need.
2. **Choose a prompt style** — decide how you want the answer to be written.
3. **Enter your request** — write your question or paste your text, then select **Ask PromptPilot**.

The response appears in the dark response panel on the right.

---

## Assistant functions

| Function | What it does | Example request |
| --- | --- | --- |
| **Answer** | Gives clear responses to factual or study questions. | `What is photosynthesis?` |
| **Summarize** | Extracts the main idea and key points from supplied text. | `Summarize this article in three bullets.` |
| **Create** | Produces original stories, poems, and short creative pieces. | `Write a hopeful poem about learning.` |
| **Advise** | Gives practical, supportive suggestions for a situation or goal. | `How can I prepare for exams next month?` |

### 1. Answer questions

Use this function when you need to understand a fact, topic, or concept.

- **Quick fact** — a direct answer with one useful detail.
- **Explain simply** — beginner-friendly language and a short example.
- **Study answer** — an explanation with key terms and facts to remember.

### 2. Summarize text

Paste a paragraph, article excerpt, or notes when you need a shorter version.

- **Brief** — three concise bullet points.
- **Structured** — main idea, key points, and conclusion.
- **Student notes** — revision notes with important terms.

### 3. Create content

Use this mode for original writing.

- **Imaginative** — vivid language and sensory detail.
- **Constrained** — follows the requested tone, length, and format.
- **Polished** — ends with a memorable final line.

### 4. Get advice

Use this mode for study, productivity, planning, and everyday decisions.

- **Action plan** — five realistic steps.
- **Supportive** — encouraging guidance with a small first step.
- **Compare options** — choices, trade-offs, and a recommended starting point.

> **Note:** PromptPilot can support everyday guidance, but it should not replace qualified medical, legal, financial, or emergency help.

---

## How prompt styles improve responses

The same task can need different types of answers. Prompt styles make that choice easy:

| If you want… | Try… |
| --- | --- |
| A short direct answer | **Quick fact** or **Brief** |
| An easy explanation | **Explain simply** |
| Revision material | **Study answer** or **Student notes** |
| Steps you can follow | **Action plan** |
| A specific creative format | **Constrained** |

For better results, include details such as the intended audience, the output length, the tone, and the format you want.

**Example**

Instead of:

> Explain climate change.

Try:

> Explain climate change to a class 8 student in five simple bullet points.

---

## Feedback loop

After receiving a response, PromptPilot asks:

> **Was this response helpful?**

Choose one option:

- **Yes, helpful** — records that the selected prompt style worked well.
- **Not yet** — suggests trying another style or adding more context.

Feedback is saved locally in `feedback.json`. It can be used to see which prompt styles produce the most useful responses and improve future prompt design.

---

## AI connection setup

PromptPilot is configured to run in **demo mode** without an API key to prevent unwanted charges. For real AI-generated answers, you can add an OpenRouter key to the Vercel deployment:

1. Create an API key at [OpenRouter Keys](https://openrouter.ai/settings/keys).
2. Go to your Vercel Project Dashboard -> Settings -> Environment Variables.
3. Add the following keys:
   - `OPENROUTER_API_KEY`: `your_private_key_here`
   - `OPENROUTER_MODEL`: `openrouter/free`
4. Redeploy your project for the changes to take effect.

Never share your API key publicly or commit it to GitHub.

---

## Troubleshooting

| Problem | What to do |
| --- | --- |
| The website does not open | Check your internet connection and ensure the URL is correct. |
| The app shows **DEMO** | The live deployment does not have an active API key configured. You must add it to Vercel's Environment Variables. |
| API responses fail | Confirm that your OpenRouter account/key is active. |

---

## Project checklist

- [x] Four distinct assistant functions
- [x] Three prompt designs for every function
- [x] User-friendly web interface
- [x] Clear response area
- [x] Helpful / not-helpful feedback loop
- [x] Markdown user guide

---

<p align="center">Built with thoughtful prompts, clear choices, and user feedback. ✦</p>
