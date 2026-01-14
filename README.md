
# Rago Translation App

A simple, modern, and responsive **English → German** translator with **automatic** and **manual** translation modes.

🌐 **Live Demo**: [https://lang-translation.vercel.app/](https://lang-translation.vercel.app/)  
📦 **Repository**: [https://github.com/Yellaletscode/rago-translation.git](https://github.com/Yellaletscode/rago-translation.git)

## Features

### Translation Modes

#### 1. Auto Translation (default)
- Type English text in the source area → translation to German appears **automatically** after a short pause (~500ms debounce)
- Prevents unnecessary API calls while you're still typing
- Controlled by the **"Automatic"** toggle switch (enabled by default)
- Shows a loading spinner during translation
- Displays user-friendly error messages if the API fails

#### 2. Manual Translation
- When **"Automatic"** is turned **off**, a **Translate** button appears
- Click the blue **Translate** button to request translation manually
- Gives you full control — perfect for reviewing/editing longer text before translating

### Additional Features
- Clean, responsive design (works great on mobile & desktop)
- Copy text to clipboard (both source and translated)
- Clear input with one click (X icon)
- Visual feedback for loading and errors

## Quick Usage Guide

1. Open the app: [https://lang-translation.vercel.app/](https://lang-translation.vercel.app/)
2. Start typing English text in the **left textarea**
3. **If Automatic is ON** → translation appears automatically after ~0.5 seconds
4. **If Automatic is OFF** → click the **Translate** button to get the result
5. Use the icons below each box to:
   - Copy the text
   - Clear the input
   - (Listen feature – coming soon)

**Example:**
- Input: Hello world
- Output: Hallo Welt

## Setup & Running Locally

### Prerequisites
- Node.js ≥ 18
- npm or yarn
- A **RapidAPI key** for Google Translate API (free tier works for development)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yellaletscode/rago-translation.git
   cd rago-translation


2. 🌍 Language Translator App

A modern language translation web app built with React + Vite, powered by Google Translate API via RapidAPI. The app features fast translations, clean UI, and scalable state management using Redux Toolkit.

🚀 Getting Started
1️⃣ Install Dependencies
npm install
# or
yarn install

2️⃣ Add Your RapidAPI Key

Create a .env file in the root folder and add:

VITE_RAPID_API_KEY=your_rapidapi_key_here


🔑 Get your API key here:
https://rapidapi.com/googletranslateapi/api/google-translate113

⚠️ Important:
Environment variables in Vite must start with VITE_

3️⃣ Start Development Server
npm run dev
# or
yarn dev


Open your browser at:

http://localhost:5173


(or the port shown in your terminal)

4️⃣ Build for Production (Optional)
npm run build
