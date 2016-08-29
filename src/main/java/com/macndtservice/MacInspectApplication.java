package com.macndtservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@SpringBootApplication(scanBasePackages = { "com.macndtservice.controller" })
@Configuration
@ImportResource("classpath*:services.xml")
public class MacInspectApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MacInspectApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(MacInspectApplication.class, args);
    }
}
