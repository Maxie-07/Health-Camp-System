package com.healthcamp.model.dto.response;

import com.healthcamp.model.enums.StockUnit;
import java.time.Instant;

public record StockItemResponse(
        Long id,
        String name,
        String sku,
        int quantity,
        int minThreshold,
        StockUnit unit,
        boolean lowStock,
        Instant createdAt,
        Instant updatedAt
) {
}
