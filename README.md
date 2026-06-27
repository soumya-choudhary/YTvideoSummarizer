# 📹 YTVideoSummarizer

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge\&logo=react\&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge\&logo=node.js\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge\&logo=python\&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge\&logo=flask\&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75FF?style=for-the-badge\&logo=googlegemini\&logoColor=white)

## 🚀 Overview

**YTVideoSummarizer** is an AI-powered learning platform that transforms lengthy YouTube videos into concise summaries, structured chapters, and interactive conversations. It combines a MERN stack application with a Python Flask microservice powered by LangChain, FAISS, and Google Gemini to provide an intelligent video-learning experience.

---

## ✨ Features

* 📝 AI-generated summaries from YouTube videos
* 💬 Retrieval-Augmented Generation (RAG) chat with video transcripts
* ⏱️ Automatic chapter generation with timestamps
* 📓 Rich-text note taking using TipTap
* 🔍 Semantic transcript search using FAISS
* 🔐 JWT Authentication
* 🌐 Google OAuth 2.0 Login

---

# 🏗️ Architecture

```mermaid
graph TD;
    User((User))
    YT_API[YouTube Transcript API]
    Gemini[Google Gemini API]

    subgraph "Frontend (React / Vite)"
        UI[Web UI]
        Auth_UI[OAuth / Auth Forms]
        Player[YouTube Player]
    end

    subgraph "Backend (Node.js / Express)"
        Gateway[API Gateway]
        Auth[Authentication Service]
        DB[(MongoDB)]
    end

    subgraph "AI Microservice (Python / Flask)"
        Flask_API[Flask API]
        Scraper[Transcript Extractor]
        Chunker[Text Splitter]
        VectorStore[(FAISS)]
        LC[LangChain RAG]
    end

    User --> UI
    User --> Auth_UI

    UI --> Gateway
    Auth_UI --> Auth

    Auth <--> DB
    Gateway <--> DB

    Gateway --> Flask_API

    Flask_API --> Scraper
    Scraper --> YT_API

    Scraper --> Chunker
    Chunker --> VectorStore

    Flask_API --> LC
    LC --> VectorStore
    LC --> Gemini
    Gemini --> LC
    LC --> Flask_API
```

---

# 🛠️ Tech Stack

## Frontend

* React (Vite)
* JavaScript
* Tailwind CSS
* Shadcn UI
* GSAP
* React YouTube

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Google OAuth 2.0

## AI Microservice

* Python
* Flask
* LangChain
* Google Gemini
* FAISS
* YouTube Transcript API

---

# ⚙️ Local Setup

## Prerequisites

* Node.js 18+
* Python **3.11** (Recommended)
* MongoDB Atlas
* Google Cloud OAuth Credentials
* Gemini API Key

> **Note:** This project currently uses LangChain 0.2.x and is recommended to run with **Python 3.11** for compatibility.

---

## Clone Repository

```bash
git clone https://github.com/your-username/ytvideosummarizer.git
cd yousummarizer
```

---

## Environment Variables

### frontend/.env

```env
VITE_BACKEND_URI=http://localhost:5000
```

### backend/.env

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_jwt_secret

FLASK_URI=http://localhost:8080

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### services/.env

```env
GOOGLE_API_KEY=your_gemini_api_key
```

---

# ▶️ Running the Project

Open **three separate terminals**.

## Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

## Terminal 2 — AI Microservice

```bash
cd services

python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

Runs on:

```
http://localhost:8080
```

---

## Terminal 3 — Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# 📂 Project Structure

```
YTVideoSummarizer/
│
├── frontend/
│
├── backend/
│
├── services/
│
└── README.md
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.
