@echo off

powershell Get-Clipboard -TextFormatType UnicodeText>Tmp.txt
code Tmp.txt