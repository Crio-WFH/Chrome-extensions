@REM WARNING: Don't modify this!

@echo off
set key1=com.hksm.vscode.native
set key2=com.hksm.atom.native
set key3=com.hksm.sublime.native
set key4=com.hksm.notepad.native
set key5=com.hksm.npp.native

cd /d "%~dp0"
cd ..

if not exist "clients\" mkdir clients

@REM -----------VS-Code-------------

powershell Get-Clipboard>tmp.txt
set /p id=<tmp.txt
del tmp.txt
echo { > clients/vscode.json
echo     "name": "com.hksm.vscode.native", >> clients/vscode.json
echo     "description": "Starts VS Code", >> clients/vscode.json
echo     "path": "vs.bat", >> clients/vscode.json
echo     "type": "stdio", >> clients/vscode.json
echo     "allowed_origins": [ >> clients/vscode.json
echo         "chrome-extension://%id%/" >> clients/vscode.json
echo      ] >> clients/vscode.json
echo } >> clients/vscode.json


@echo @echo off> clients/vs.bat
@echo powershell Get-Clipboard -TextFormatType UnicodeText^>Tmp.txt>> clients/vs.bat
@echo code Tmp.txt>> clients/vs.bat

@REM -----------Atom-------------

echo { > clients/atom.json
echo     "name": "com.hksm.atom.native", >> clients/atom.json
echo     "description": "Starts Atom", >> clients/atom.json
echo     "path": "atom.bat", >> clients/atom.json
echo     "type": "stdio", >> clients/atom.json
echo     "allowed_origins": [ >> clients/atom.json
echo         "chrome-extension://%id%/" >> clients/atom.json
echo      ] >> clients/atom.json
echo } >> clients/atom.json


@echo @echo off> clients/atom.bat
@echo powershell Get-Clipboard -TextFormatType UnicodeText^>Tmp.txt>> clients/atom.bat
@echo atom Tmp.txt>> clients/atom.bat

@REM -----------Sublime-------------

echo { > clients/sublime.json
echo     "name": "com.hksm.sublime.native", >> clients/sublime.json
echo     "description": "Starts Sublime", >> clients/sublime.json
echo     "path": "sublime.bat", >> clients/sublime.json
echo     "type": "stdio", >> clients/sublime.json
echo     "allowed_origins": [ >> clients/sublime.json
echo         "chrome-extension://%id%/" >> clients/sublime.json
echo      ] >> clients/sublime.json
echo } >> clients/sublime.json


@echo @echo off> clients/sublime.bat
@echo powershell Get-Clipboard -TextFormatType UnicodeText^>Tmp.txt>> clients/sublime.bat
@echo start "" subl.exe Tmp.txt>> clients/sublime.bat

@REM -----------Notepad-------------

echo { > clients/notepad.json
echo     "name": "com.hksm.notepad.native", >> clients/notepad.json
echo     "description": "Starts Notepad", >> clients/notepad.json
echo     "path": "notepad.bat", >> clients/notepad.json
echo     "type": "stdio", >> clients/notepad.json
echo     "allowed_origins": [ >> clients/notepad.json
echo         "chrome-extension://%id%/" >> clients/notepad.json
echo      ] >> clients/notepad.json
echo } >> clients/notepad.json


@echo @echo off> clients/notepad.bat
@echo powershell Get-Clipboard -TextFormatType UnicodeText^>Tmp.txt>> clients/notepad.bat
@echo start "" notepad.exe Tmp.txt>> clients/notepad.bat

@REM -----------Notepad++-------------

echo { > clients/npp.json
echo     "name": "com.hksm.npp.native", >> clients/npp.json
echo     "description": "Starts Notepad++", >> clients/npp.json
echo     "path": "npp.bat", >> clients/npp.json
echo     "type": "stdio", >> clients/npp.json
echo     "allowed_origins": [ >> clients/npp.json
echo         "chrome-extension://%id%/" >> clients/npp.json
echo      ] >> clients/npp.json
echo } >> clients/npp.json


@echo @echo off> clients/npp.bat
@echo cd %dp~0
@echo powershell Get-Clipboard -TextFormatType UnicodeText^>Tmp.txt>> clients/npp.bat
@echo start notepad++ Tmp.txt>> clients/npp.bat

xcopy ".\clients" "%localappdata%\clients" /i /y /q

reg add "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key1%" /f /t REG_SZ /d "%localappdata%\clients\vscode.json"
reg add "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key2%" /f /t REG_SZ /d "%localappdata%\clients\atom.json"
reg add "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key3%" /f /t REG_SZ /d "%localappdata%\clients\sublime.json"
reg add "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key4%" /f /t REG_SZ /d "%localappdata%\clients\notepad.json"
reg add "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key5%" /f /t REG_SZ /d "%localappdata%\clients\npp.json"

del clients /q
rmdir clients

@REM pause