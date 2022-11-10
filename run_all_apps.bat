@echo off

set back=%cd%

for /d %%i in ("food-app-container","food-app-inventory","food-app-cutomers","food-app-orders") do (

cd "%%i" 

start "" call npm run serve

cd %back%

)