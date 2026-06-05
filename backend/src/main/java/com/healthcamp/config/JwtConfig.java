package com.healthcamp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "healthcamp.jwt")
public class JwtConfig {

    private String secret = "change-me-in-production-use-at-least-32-chars";
    private long expiryMs = 86400000L;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpiryMs() {
        return expiryMs;
    }

    public void setExpiryMs(long expiryMs) {
        this.expiryMs = expiryMs;
    }
}
