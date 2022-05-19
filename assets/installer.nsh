!macro customInstall
  File /oname=$PLUGINSDIR\sox-14.4.1a-win32.exe "${BUILD_RESOURCES_DIR}\sox-14.4.1a-win32.exe"
  ExecWait '$PLUGINSDIR\sox-14.4.1a-win32.exe'

  EnVar::SetHKLM
  EnVar::AddValue "PATH" "$INSTDIR"
  Pop $0

!macroend