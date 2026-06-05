package com.healthcamp.controller;

import com.healthcamp.config.JwtConfig;
import com.healthcamp.model.dto.request.LoginRequest;
import com.healthcamp.model.dto.request.RefreshTokenRequest;
import com.healthcamp.model.dto.response.AuthResponse;
import com.healthcamp.model.entity.User;
import com.healthcamp.repository.UserRepository;
import com.healthcamp.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtUtil jwtUtil,
                          JwtConfig jwtConfig,
                          UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.jwtConfig = jwtConfig;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    AuthResponse login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, "Bearer", jwtConfig.getExpiryMs(), user.getUsername(), user.getRole().name());
    }

    @PostMapping("/refresh")
    AuthResponse refresh(@Valid @RequestBody RefreshTokenRequest request) {
        String username = jwtUtil.extractUsername(request.token());
        User user = userRepository.findByUsername(username).orElseThrow();
        if (!jwtUtil.isTokenValid(request.token(), username)) {
            throw new org.springframework.security.authentication.BadCredentialsException("Invalid token");
        }
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token, "Bearer", jwtConfig.getExpiryMs(), user.getUsername(), user.getRole().name());
    }
}
