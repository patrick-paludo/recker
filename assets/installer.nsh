!macro customInstall
  !addplugindir "${BUILD_RESOURCES_DIR}\x86-ansi"
  File /oname=$PLUGINSDIR\sox-14.4.1a-win32.exe "${BUILD_RESOURCES_DIR}\sox-14.4.1a-win32.exe"
  ExecWait '$PLUGINSDIR\sox-14.4.1a-win32.exe'

  ; EnVar::SetHKLM
  ; EnVar::AddValue "PATH" "$INSTDIR"
  ; Pop $0

  ; Check if the path entry already exists and write result to $0
  nsExec::Exec 'echo %PATH% | find "$INSTDIR"'
  Pop $0   ; gets result code

  ${If} $0 = 0
      nsExec::Exec 'setx PATH=%PATH%;$INSTDIR'
  ${EndIf}
!macroend