package com.healthcamp.model.dto.response;

import java.time.Instant;
import java.util.List;

public record SyncPullResponse(
        Instant syncedAt,
        List<BeneficiaryResponse> beneficiaries,
        List<VisitResponse> visits,
        List<StockItemResponse> stockItems
) {
}
