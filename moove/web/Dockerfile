FROM adoptopenjdk/openjdk11:jdk-11.0.4_11-alpine-slim

ENV APP_TARGET target
ENV APP web.jar
ENV AGENT_PATH /opt/dd-java-agent.jar
ENV JAVA_AGENT -javaagent:${AGENT_PATH}

RUN mkdir -p /opt
COPY ${APP_TARGET}/${APP} /opt
COPY dd-java-agent.jar ${AGENT_PATH}

ENTRYPOINT MEM_PARAMS=$(/param_tuning.sh ${HEAP_SIZE:-512}); exec java ${JAVA_AGENT} ${JAVA_OPTS} ${MEM_PARAMS} -jar /opt/${APP}
