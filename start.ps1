# CodeSage Startup Script for Windows
# Starts both backend and frontend servers

Write-Host "╔════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Starting CodeSage Services...         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path "backend/.env")) {
    Write-Host "❌ backend/.env not found!" -ForegroundColor Red
    Write-Host "Please run setup.ps1 first and configure your API key." -ForegroundColor Yellow
    exit 1
}

Write-Host "🚀 Starting backend server..." -ForegroundColor Yellow
Write-Host ""

# Start backend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host '🔥 Backend Server Starting...' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 3

Write-Host "🎨 Starting frontend server..." -ForegroundColor Yellow
Write-Host ""

# Start frontend in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; Write-Host '⚡ Frontend Server Starting...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3001" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "The browser should open automatically." -ForegroundColor Yellow
Write-Host "If not, navigate to http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop the servers, close the PowerShell windows." -ForegroundColor White
