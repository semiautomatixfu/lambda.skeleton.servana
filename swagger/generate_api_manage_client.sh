#!/usr/bin/env bash

executable="./swagger-codegen-cli.jar"

if [ ! -f "$executable" ]
then
  wget https://repo1.maven.org/maven2/io/swagger/swagger-codegen-cli/2.4.1/swagger-codegen-cli-2.4.1.jar -O swagger-codegen-cli.jar
fi

# wget http://localhost:8081/v2/api-docs?group=manage -O api.manage.json

export JAVA_OPTS="${JAVA_OPTS} -XX:MaxPermSize=256M -Xmx1024M -DloggerPath=conf/log4j.properties"
ags="generate -i ./api.manage.json -l typescript-node -o ../src/generated/ApiManage -D withInterfaces=true,supportsES6=true"

java $JAVA_OPTS -jar $executable $ags

