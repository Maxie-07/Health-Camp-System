package com.healthcamp.model.dto.request;

import jakarta.validation.constraints.NotNull;
import java.time.Instant;

public record VisitRequest(
        @NotNull Long beneficiaryId,
        Instant visitDate,
        String vitals,
        String diagnosis,
        String treatment
) {
}
