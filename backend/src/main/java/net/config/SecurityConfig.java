package net.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.StaticHeadersWriter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig implements WebMvcConfigurer {

        private final JwtAuthenticationFilter JwtAuthenticationFilter;
        private final AuthenticationProvider authenticationProvider;

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
                httpSecurity
                                .csrf(csrf -> csrf.disable()).cors(Customizer.withDefaults())
                                .headers(header -> header
                                                .addHeaderWriter(new StaticHeadersWriter("Access-Control-Allow-Origin",
                                                                "http://localhost:3000")))
                                .authorizeHttpRequests(
                                                auth -> auth.requestMatchers("/auth/**").permitAll()
                                                                .requestMatchers("/home/**").permitAll()
                                                                .requestMatchers("/api/v1/admin/**")
                                                                .permitAll()
                                                                .requestMatchers("/user/**").hasAuthority("USER")
                                                                .anyRequest().authenticated())
                                .sessionManagement(
                                                session -> session
                                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                return httpSecurity.build();
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                                .allowedOrigins("http://localhost:3000") // Replace with your frontend origin
                                .allowedMethods("*")
                                .allowedHeaders("*")
                                .exposedHeaders("*") // Expose any custom headers if needed
                                .allowCredentials(true)
                                .maxAge(3600); // Max age of the preflight request in seconds
        }
}