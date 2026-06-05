package com.healthcamp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "healthcamp.cors")
public class CorsProperties {

    private String origins = "http://localhost:4200,http://localhost:8081";
    private String originPatterns = "http://localhost:*,http://127.0.0.1:*";

    public String getOrigins() {
        return origins;
    }

    public void setOrigins(String origins) {
        this.origins = origins;
    }

    public String getOriginPatterns() {
        return originPatterns;
    }

    public void setOriginPatterns(String originPatterns) {
        this.originPatterns = originPatterns;
    }
}
