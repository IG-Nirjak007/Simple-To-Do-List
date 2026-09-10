@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script, version 3.2.0
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the batch commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to wait for a key stroke before ending
@REM MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@IF "%__MVNW_ARG0_NAME__%"=="" (SET "BASE_DIR=%~dp0") ELSE (SET "BASE_DIR=%__MVNW_ARG0_NAME__%")

@SET MAVEN_PROJECTBASEDIR=%BASE_DIR%

IF NOT "%JAVA_HOME%"=="" GOTO javaHomeSet
ECHO Error: JAVA_HOME not found in your environment. >&2
ECHO Please set the JAVA_HOME variable in your environment to match the >&2
ECHO location of your Java installation. >&2
GOTO error

:javaHomeSet
IF NOT EXIST "%JAVA_HOME%\bin\java.exe" (
    ECHO Error: JAVA_HOME is set to an invalid directory: %JAVA_HOME% >&2
    GOTO error
)

SET JAVA_EXE="%JAVA_HOME%\bin\java.exe"

SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
SET DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

IF EXIST %WRAPPER_JAR% (
    GOTO skipDownload
)

ECHO Downloading Maven Wrapper from: %DOWNLOAD_URL%
%JAVA_EXE% -classpath "%JAVA_HOME%/lib/bootstrap.jar;%JAVA_HOME%/lib/tools.jar" org.apache.maven.wrapper.Install %DOWNLOAD_URL% %WRAPPER_JAR% 2>&1

:skipDownload
%JAVA_EXE% %MAVEN_OPTS% -classpath %WRAPPER_JAR% %WRAPPER_LAUNCHER% %MAVEN_PROJECTBASEDIR% %*
IF ERRORLEVEL 1 GOTO error
GOTO end

:error
SET ERROR_CODE=1

:end
@endlocal & SET ERROR_CODE=%ERROR_CODE%
IF NOT "%MAVEN_BATCH_PAUSE%"=="on" GOTO after_pause
PAUSE
:after_pause
IF "%MAVEN_BATCH_ECHO%"=="on" ECHO OFF
EXIT /B %ERROR_CODE%
