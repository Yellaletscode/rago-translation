
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
```
2. **Install dependencies**
```bash
npm install
```
# or
```bash
yarn install
```
Add your RapidAPI key
3. **Create a file named .env in the root folder:**
VITE_RAPID_API_KEY=your_rapidapi_key_here
→ Get your key here: https://rapidapi.com/googletranslateapi/api/google-translate113
4. **Start development server**
```bash
npm run dev
```
# or
```bash
yarn dev
```
Open http://localhost:5173 (or the port shown)
Build for production (optional)
```bash
npm run build
```
**Important Note:**
Without a valid VITE_RAPID_API_KEY in .env, translations will fail and show error messages.
Technologies Used
Frontend: React + Vite
State Management: Redux Toolkit (with createAsyncThunk)
Styling: Tailwind CSS
Icons: Lucide React
Testing: Jest + React Testing Library
Deployment: Vercel
Future Improvements (Planned)
Support more language pairs
Implement text-to-speech (listen button)
Add swap source/target functionality
Support dark mode
Improve error handling & retry mechanism
### License
MIT License — feel free to use, modify, and distribute!

