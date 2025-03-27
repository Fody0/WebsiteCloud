package Kara.CloudCom.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Отключаем CSRF (для API обычно не нужен)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/Users/save_user", "/api/v1/Users/login").permitAll()  // Разрешаем регистрацию и логин без авторизации
                        .anyRequest().authenticated()  // Все остальные запросы требуют аутентификации
                );
        return http.build();
    }

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())  // Отключение CSRF
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/login", "/register", "/public/**").permitAll()  // Открытые эндпоинты
//                        .anyRequest().authenticated()  // Остальные требуют авторизации
//                )
//                .sessionManagement(session -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.NEVER)  // Всегда создавать сессии
//                );
//
//        return http.build();
//    }
}