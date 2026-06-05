FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY backend/pom.xml .
COPY backend/src ./src
RUN apt-get update && apt-get install -y maven && \
    mvn -q -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/healthcamp-backend-*.jar app.jar
EXPOSE 5000
ENTRYPOINT ["java", "-jar", "app.jar"]
