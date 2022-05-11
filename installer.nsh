!macro customInstall
  File /oname=$PLUGINSDIR\sox-14.4.1a-win32.exe "${BUILD_RESOURCES_DIR}\extramsi.msi"
  ExecWait '.\sox-14.4.1a-win32.exe'
!macroend