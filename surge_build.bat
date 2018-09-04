@echo off
echo This code will build app and deploy it on s3, press 2 keys to continue
pause
echo press 1 keys to continue
@echo off
pause

npm run build && surge ./dist msdmsd.surge.sh 
