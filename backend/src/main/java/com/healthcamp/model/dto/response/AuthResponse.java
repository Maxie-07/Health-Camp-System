package com.healthcamp.model.dto.response;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresInMs,
        String username,
        String role
) {
}
