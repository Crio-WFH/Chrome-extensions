set key1=com.hksm.vscode.native
set key2=com.hksm.atom.native
set key3=com.hksm.sublime.native
set key4=com.hksm.notepad.native
set key5=com.hksm.npp.native
set key6=com.hksm.cloner.native

rd "%localappdata%\clients" /s /q

reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key1%" /f
reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key2%" /f
reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key3%" /f
reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key4%" /f
reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key5%" /f
reg delete "HKCU\SOFTWARE\Google\Chrome\NativeMessagingHosts\%key6%" /f