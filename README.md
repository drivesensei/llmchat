# Oli

A vite + reactjs project to talk to an LLM of your choice.

Currently it supports ollama with the llama3.2 model

### Setup

1. [Setup](https://ollama.com/download/mac) ollama in your local machine
2. Download llama3.2 by doing `ollama pull llama3.2` on your console
3. Run ollama API with `ollama serve`
4. Run `npm install` and `npm run dev` to run the project

### Tech stack.

Vite
ReactJS
TailwindCSS + DaisyUI
Signals React from @preact

Conversations are persisted in browser's localstorage
