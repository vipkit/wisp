#!/bin/bash
set -e

if [[ $# == 0 ]];then
  echo "At least one host machine is required"
  exit 1
fi


echo "====start build===="
mode=${mode:production}
yarn build --mode=$mode

for host in $@
do
  echo "====start rsync to $host===="
  /usr/local/bin/rsync -arqO dist/* $host:/var/www/wisp/ --chown=`whoami`:www-data --chmod=D2775,F774
  echo "====deploy success to $host===="
done

release=`npx -c 'echo "$mode@$npm_package_version"'`
echo $release

sentry-cli releases  -o baoshishu -p wisp files $release upload-sourcemaps dist/js --rewrite --url-prefix '~/js'

