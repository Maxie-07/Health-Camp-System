package com.healthcamp.model.dto.response;

public record DashboardSummaryResponse(
        long beneficiaryCount,
        long todayVisits,
        long lowStockCount
) {
}
