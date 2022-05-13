!include "EnvVarUpdate.nsh"
!macro customInstall
  File /oname=$PLUGINSDIR\sox-14.4.1a-win32.exe "${BUILD_RESOURCES_DIR}\sox-14.4.1a-win32.exe"
  ExecWait '$PLUGINSDIR\sox-14.4.1a-win32.exe'
  ${EnvVarUpdate} $0 "PATH" "A" "HKLM" "$INSTDIR"
!macroend

!macro customUnInstall
    ${un.EnvVarUpdate} $0 "PATH" "R" "HKLM" "$INSTDIR"
!macroend