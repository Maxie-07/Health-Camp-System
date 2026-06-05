package com.healthcamp.model.dto.response;

import java.time.LocalDate;
import java.util.List;

public record DailyReportResponse(
        LocalDate date,
        long totalVisits,
        long totalBeneficiaries,
        long lowStockItems
) {
}
