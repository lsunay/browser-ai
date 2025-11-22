# Browser AI Agent

[![Browser Support](https://img.shields.io/badge/status-Firefox%20(Stable)-orange)](https://www.mozilla.org/firefox/) [![Browser Support](https://img.shields.io/badge/status-Chrome%20(WIP)-lightgrey)](https://www.google.com/chrome/)

A powerful browser extension that enables AI models to interact with and control your browser. This fork adapts the original [browser-ai](https://github.com/0xSero/browser-ai) repository to run on **Mozilla Firefox**.

While the underlying JavaScript has been made cross-browser compatible, this branch is currently configured to work **out-of-the-box only on Firefox**.

## Core Concept: When to Use This Agent

This extension is not a simple chatbot; it is a powerful **automation agent**. Its true value lies in executing dynamic, multi-step workflows that are impossible for standard chatbots.

Think of it like this: using this agent to ask "What is the capital of France?" is like using a Formula 1 car to go to the grocery store. It's overkill and inefficient.

**When is this agent NOT the right tool?**
- For simple, single-step tasks like summarizing a page you already have open.
- For answering general knowledge questions that don't require browser interaction.
- With local models that have a small context window (e.g., 4k tokens).

**When is this agent invaluable?**
- For complex, multi-step tasks that require navigating websites, interacting with elements, and synthesizing information from multiple sources.
- For automating workflows that you can describe but cannot easily script.

**Example of a powerful use case:**
> "Go to our company's sales dashboard, apply the 'Last 30 Days' filter, find the 'Total Revenue' figure, then navigate to our competitor's website, get the title of their latest blog post, and present both pieces of information to me in a summary."

This is the kind of task where the agent's high token cost provides a massive return on investment by saving significant time and manual effort.

## Considerations on Token Cost & Local Models

This agent operates by sending a large amount of information to the AI model on **every request**. This information includes the system prompt, the conversation history, and—most significantly—the definitions for all **20+ available browser tools**.

- **High Token Cost:** This context regularly consumes **3,500+ tokens** *before* your actual question is even added.
- **Context Length is Critical:** For this reason, the agent is best suited for models with a large context window (e.g., 32k, 128k, or more).
- **Challenges with Local Models:** Using models with a small context limit (e.g., 4k or 8k) will lead to issues. The context can fill up quickly, causing the model to lose track of the conversation or fail to respond, sometimes getting stuck in a loop of trying to re-gather information.

## Features

- **Tabbed Interface**: A clean UI with separate tabs for the interactive "Agent" and the analytical "Deep-Insight".
- **Customizable Deep-Insight Prompts**: Configure, add, or delete your own one-click analysis prompts from the settings menu.
- **Markdown Support**: AI responses are rendered with rich formatting (headings, lists, code blocks) for better readability.
- **Settings Import/Export**: Backup and restore all your settings, including your custom Deep-Insight prompts, to a JSON file.
- **Cross-Browser Ready**: The core logic uses the `browser.*` namespace, making future support for Chrome straightforward.

## Installation (for Firefox)

### Prerequisites
- **Mozilla Firefox** (version 112+)
- An API key from an OpenAI-compatible provider.

### 1. Get the Code
```bash
git clone https://github.com/lsunay/browser-ai.git
cd browser-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Load the Extension in Firefox
1. Navigate to `about:debugging#/runtime/this-firefox`.
2. Click "Load Temporary Add-on...".
3. Select the `manifest.json` file from the project directory.

**Note on Chrome:** To run this on Chrome, you would need to modify the `manifest.json` file to use `service_worker` and `side_panel` keys and add the `"sidePanel"` permission.

## Development and Building

### Building the Package for Firefox
To create a distributable `.zip` file for Firefox, run the build command:
```bash
npm run build
```
The packaged extension will be created in the `web-ext-artifacts/` directory.

## Future Enhancements

Potential features and optimizations for future versions:

- **[Optimization] Smart Tool Selection:** A pre-processing step to analyze the user's prompt and send only the most relevant tools to the AI, drastically reducing token cost.
- **[Optimization] Tool Definition Pruning:** Shortening the descriptions and parameter names in the tool definitions to save tokens.
- **[UX] Conversation Management:** Add a "Clear Conversation" button to allow the user to manually reset the context.
- **[Feature] Visual Element Selection:** A tool to allow the user to visually click on an element to select it.
- **[Feature] Session Recording & Playback:** Record a sequence of actions and allow the AI to play them back.

## License

MIT License - see LICENSE file for details.