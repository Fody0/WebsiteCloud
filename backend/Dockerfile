FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

COPY pom.xml .
COPY src ./src
COPY .mvn ./.mvn
COPY mvnw .

COPY wait-for-it.sh /wait-for-it.sh

RUN chmod +x /wait-for-it.sh

RUN ./mvnw clean package -DskipTests

RUN mv target/CloudCom-0.0.1-SNAPSHOT.jar app.jar

COPY .env .

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]