@echo off
title Personal Placement Preparation Portal Launcher
echo ========================================================
echo   Launching Personal Placement Preparation Portal...
echo ========================================================
echo.
echo [1/2] Starting Backend API Server on Port 5000...
start "Placement Portal Backend" cmd /k "cd /d %~dp0backend && node server.js"
timeout /t 2 >nul
echo [2/2] Starting Frontend React App on Port 3000...
start "Placement Portal Frontend" cmd /k "cd /d %~dp0 && npm start"
echo.
echo ========================================================
echo   Both servers launched successfully!
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:5000
echo ========================================================
