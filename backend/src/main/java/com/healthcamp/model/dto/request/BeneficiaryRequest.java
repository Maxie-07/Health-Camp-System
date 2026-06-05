package com.healthcamp.model.dto.request;

import jakarta.validation.constraints.NotBlank;

public record BeneficiaryRequest(
        @NotBlank String fullName,
        String phone,
        String nationalId,
        String campLocation
) {
}
