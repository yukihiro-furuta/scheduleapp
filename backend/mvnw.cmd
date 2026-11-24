@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0") ELSE SET "BASE_DIR=%__MVNW_ARG0_NAME__%" & SET "__MVNW_ARG0_NAME__="

@REM Remove trailing backslash to avoid \" quoting bug
@IF "%BASE_DIR:~-1%"=="\" SET "BASE_DIR=%BASE_DIR:~0,-1%"

@SET "WRAPPER_JAR=%BASE_DIR%\.mvn\wrapper\maven-wrapper.jar"
@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
@SET WRAPPER_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.3.2/maven-wrapper-3.3.2.jar

@IF NOT EXIST "%WRAPPER_JAR%" (
  @ECHO Downloading maven-wrapper.jar ...
  @powershell -Command "$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '%WRAPPER_URL%' -OutFile '%WRAPPER_JAR%'"
  @IF %ERRORLEVEL% NEQ 0 (
    @ECHO Failed to download maven-wrapper.jar
    @EXIT /B 1
  )
)

@SET JAVA_EXE=java.exe
@IF DEFINED JAVA_HOME @SET "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
@IF NOT EXIST "%JAVA_EXE%" @SET "JAVA_EXE=java.exe"

@"%JAVA_EXE%" ^
  -classpath "%WRAPPER_JAR%" ^
  -Dmaven.multiModuleProjectDirectory="%BASE_DIR%" ^
  %WRAPPER_LAUNCHER% %*
