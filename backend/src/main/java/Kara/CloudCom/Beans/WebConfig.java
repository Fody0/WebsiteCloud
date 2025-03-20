package Kara.CloudCom.Beans;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println("--------------- addCorsMappings");
        registry.addMapping("/api/**") // Allow all endpoints under /api
                .allowedOrigins("http://localhost:3000") // Allow requests from your React app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific methods
                .allowedHeaders("Authorization", "Content-Type", "Accept", "X-Requested-With", "Origin") // Allow all headers
                .allowCredentials(true); // Allow credentials
    }
}