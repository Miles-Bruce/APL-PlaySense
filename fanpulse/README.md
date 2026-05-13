# FanPulse

A real-time, AI-powered second-screen fan engagement platform for live cricket matches.

## Setup Instructions

1. **Environment Variables**
   Create a `.env.local` file in the root directory and add the following keys:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```text
[ Live Match Event ] 
        ↓
+-----------------------+      (1) Post to /api/moment
|  Moment Trigger Panel |  ---------------------------> [ Agent 1: Moment Detection ]
+-----------------------+                                         |
        ↑                                                         ↓ (Classified Moment)
        |                                               [ Agent 2: Experience Trigger ]
        |                                                         |
        |                                                         ↓ (Interaction Config)
        |                                        +----------------------------------+
        |                                        | If Trivia -> [ Agent 3: Gemini ] |
        |                                        +----------------------------------+
        |                                                         |
+-----------------------+                                         |
|  FanPulse UI (Mobile) | <---------------------------------------+
+-----------------------+      Renders Card (Prediction, Trivia, Hype)
        |
        | (Fan Votes)
        ↓
[ Firebase Firestore ] <---> [ Agent 4: Social Pulse ] (Real-time Sync)
```

## The Agents

1. **Agent 1: Moment Detection Agent** (`/api/moment`)
   Listens to raw match events, classifies them into specific moments (WICKET, SIX, LAST_OVER, etc.), and assigns emotional weight using Gemini.

2. **Agent 2: Experience Trigger Agent** (`/api/experience`)
   Maps classified moments to specific user interactions, setting parameters like timers, question texts, and UI component types.

3. **Agent 3: Gemini Trivia Generator** (`/api/gemini/trivia`)
   Generates contextually relevant, real-time trivia questions about specific players involved in the match using Gemini.

4. **Agent 4: Social Pulse Agent** (`/api/pulse` + Firebase real-time)
   Aggregates fan votes globally and updates the UI in real-time, displaying dynamic crowd sentiment and percentage splits.
