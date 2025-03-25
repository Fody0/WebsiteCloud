FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .

RUN ./mvnw clean package -DskipTests

COPY target/CloudCom-0.0.1-SNAPSHOT.jar app.jar
COPY .env .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]