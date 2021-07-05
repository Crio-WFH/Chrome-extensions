@echo off
cd /d "%localappdata%\clients"
if not exist "%localappdata%\clients\" mkdir "%localappdata%\clients\Tmp"
cd Tmp

@REM powershell Get-Clipboard -TextFormatType UnicodeText / code -

powershell Get-Clipboard -TextFormatType UnicodeText>Tmp.txt
code Tmp.txt