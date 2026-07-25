# ✦ PromptPilot

> A simple AI Assistant for answering questions, summarizing text, creating content, and giving practical advice.

## Welcome

PromptPilot is a web-based AI Assistant created for the **AI Assistant Development** prompt-engineering project. It helps users choose the right type of task, select a prompt style, and receive a clear response in one place.

---

## Quick start

### 1. Open a terminal

Open **Windows PowerShell** or **Windows Terminal** and move into the project folder:

```powershell
cd "C:\Users\Mohamed Shakeel\OneDrive\Desktop\Internship 26\project dev env"
```

### 2. Start PromptPilot

```powershell
npm start
```

### 3. Visit the app

Open [http://localhost:3000](http://localhost:3000) in your browser.

Keep the terminal window open while using the app. To stop the server later, press `Ctrl + C` in that terminal.

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

PromptPilot works in **demo mode** without an API key. For real AI-generated answers, configure a free-tier OpenRouter key.

1. Create an API key at [OpenRouter Keys](https://openrouter.ai/settings/keys).
2. Create a `.env` file in the project folder (you can rename `.env.example`).
3. Add the following values:

```env
OPENROUTER_API_KEY=your_private_key_here
OPENROUTER_MODEL=openrouter/free
```

4. Restart the app with `npm start`.

Never share your API key or upload the `.env` file to GitHub.

---

## Troubleshooting

| Problem | What to do |
| --- | --- |
| `localhost:3000` does not open | Make sure `npm start` is running and the terminal stays open. |
| Port 3000 is already in use | Close the earlier PromptPilot terminal, then run `npm start` again. |
| The app shows **DEMO** | Check that `.env` is in the project folder, has a valid key, and restart the server. |
| API responses fail | Confirm that your internet connection and OpenRouter account/key are active. |
| `.env` does not work | In Notepad, save it as **All Files** with the exact name `.env`, not `.env.txt`. |

---

## Project checklist

- [x] Four distinct assistant functions
- [x] Three prompt designs for every function
- [x] User-friendly web interface
- [x] Clear response area
- [x] Helpful / not-helpful feedback loop
- [x] PowerPoint user guide
- [x] Markdown user guide

---

<p align="center">Built with thoughtful prompts, clear choices, and user feedback. ✦</p>
