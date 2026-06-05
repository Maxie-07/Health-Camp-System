package com.healthcamp.model.dto.response;

import java.util.List;

public record StockSummaryResponse(
        long totalItems,
        long lowStockCount,
        List<StockItemResponse> lowStockItems
) {
}
