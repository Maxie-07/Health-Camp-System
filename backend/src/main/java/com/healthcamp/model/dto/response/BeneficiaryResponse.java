package com.healthcamp.model.dto.response;

import java.time.Instant;

public record BeneficiaryResponse(
        Long id,
        String fullName,
        String phone,
        String nationalId,
        String qrCode,
        String qrCodeImageBase64,
        String campLocation,
        Instant createdAt,
        Instant updatedAt
) {
}
