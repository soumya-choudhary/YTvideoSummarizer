@echo off
title YT Video Summarizer API
echo ============================================
echo Starting YouTube Video Summarizer Backend...
echo ============================================

:: Check if virtual environment exists, create it if missing
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

:: Activate the virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

:: Upgrade pip and install requirements
echo Checking for dependency updates...
python -m pip install --upgrade pip
pip install -r requirements.txt

:: Clear screen and run the application
cls
echo ============================================
echo API Server running at http://127.0.0.1:8080
echo Press Ctrl+C to stop the server.
echo ============================================
python app.py

pause
