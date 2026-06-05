package com.healthcamp.model.dto.response;

import java.time.Instant;

public record VisitResponse(
        Long id,
        Long beneficiaryId,
        String beneficiaryName,
        Instant visitDate,
        String vitals,
        String diagnosis,
        String treatment,
        String staffUsername,
        Instant createdAt,
        Instant updatedAt
) {
}
