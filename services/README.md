# 🤖 Video Insight AI Engine (ML Backend)

This is the core Machine Learning and Artificial Intelligence pipeline for the **YTvideoSummarizer** application. It processes raw YouTube video transcripts through advanced Natural Language Processing (NLP) workflows to deliver automated video timelines, structured summaries, and context-isolated semantic querying.

---

## 🛠️ Tech Stack & Frameworks

<p align="left">
  <img src="https://shields.io" alt="Python" />
  <img src="https://shields.io" alt="LangChain" />
  <img src="https://shields.io" alt="Google Gemini" />
  <img src="https://shields.io" alt="FAISS" />
</p>

*   **Orchestration Framework:** `LangChain` (Core, Community, and Expression Language / LCEL)
*   **Foundation LLM:** `Google GenAI` (`gemini-2.0-flash`)
*   **Vector Database Engine:** `FAISS` (Facebook AI Similarity Search)
*   **Embeddings Model:** `models/embedding-001` (Google Generative AI Embeddings)

---

## 🏗️ Architecture & Processing Pipeline

The execution architecture processes input data chronologically across four tightly coupled pipeline steps:

### 1. Data Ingestion (`getVideoDetails.py`)
*   Extracts manual or automated video subtitles natively.
*   Interfaces with the YouTube Data API v3 to collect core video metadata and titles.

### 2. Processing Utilities (`utils.py`)
*   Converts numerical millisecond timelines into valid `HH:MM:SS` strings.
*   Applies a dynamic mathematical boundary controller (`chunkingConfig`) to configure sliding token window sizes and prevent data truncation.

### 3. Core AI Layer (`sumTranscript.py`)
*   Leverages a custom single-pass prompt template to run isolated textual synthesis.
*   Outputs structured, multi-topic summary blocks containing high-density bullet points.

### 4. Advanced AI Layer (`chat.py` & `getChapters.py`)
*   **RAG Engine:** Indexes document segments inside an in-memory `FAISS` vector base to construct context-isolated question answering via LangChain Runnables.
*   **Timeline Generator:** Iterates through time-blocked transcript sequences to output programmatic JSON arrays matching strict schema rules.

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have Python 3.9+ installed on your local platform.

### ⚙️ Installation & Configuration

1. **Clone the repository and enter the backend root:**
   ```bash
   git clone https://github.com
   cd YTvideoSummarizer/services
   ```

2. **Configure your Environmental Secrets:**
   Create a `.env` file in the `services/` folder and add your platform API keys:
   ```env
   GOOGLE_API_KEY="your_youtube_data_api_v3_key"
   GEMINI_API_KEY="your_google_gemini_api_key"
   ```

---

## 🏃 Running the Application

You can spin up the Flask API server using either the automated one-click startup script (Windows) or manual commands.

### Option A: Automated Startup (Windows Only) ⚡
If you are on Windows, a `start.bat` script is provided inside the `services/` directory. It automatically builds the virtual environment (`venv`), updates package dependencies via `requirements.txt`, and boots up the API server.

1. Open your terminal and navigate to the services directory:
   ```powershell
   cd services
   ```
2. Execute the automated script:
   ```powershell
   .\start.bat
   ```
*(Alternatively, you can just double-click the `start.bat` file from your Windows File Explorer).*

### Option B: Manual Startup (All Platforms) 🛠️

1. **Initialize a localized virtual space and activate it:**
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # macOS / Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

2. **Install the required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the Flask server:**
   ```bash
   python app.py
   ```

The local API endpoint will become live at `http://127.0.0.1:8080`.

---

## 🔒 Security & Git Management

To avoid pushing sensitive access keys or local dependency files to GitHub, make sure your local `.gitignore` tracks the following patterns:
```text
# Virtual Environments
venv/
.venv/
env/

# Credentials
.env
```
