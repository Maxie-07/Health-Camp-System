package com.healthcamp.unit;

import com.healthcamp.config.JwtConfig;
import com.healthcamp.security.JwtUtil;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

class JwtUtilTest {

    @Test
    void generatesAndValidatesToken() {
        JwtConfig config = new JwtConfig();
        config.setSecret("test-secret-key-with-enough-length-123456");
        config.setExpiryMs(3600000L);

        JwtUtil jwtUtil = new JwtUtil(config);
        String token = jwtUtil.generateToken("admin", "ADMIN");

        assertEquals("admin", jwtUtil.extractUsername(token));
        assertTrue(jwtUtil.isTokenValid(token, "admin"));
    }
}
