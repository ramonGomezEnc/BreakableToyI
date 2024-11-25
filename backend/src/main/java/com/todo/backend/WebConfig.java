package com.todo.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Allow CORS for all paths
				.allowedOrigins("http://localhost:8080") // Allow requests from port 8080
				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // Allow specified methods
				.allowedHeaders("*") // Allow all headers
				.allowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)
	}
}
