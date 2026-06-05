package com.healthcamp.model.dto.response;

import java.time.LocalDate;
import java.util.List;

public record WeeklyReportResponse(
        LocalDate weekStart,
        LocalDate weekEnd,
        long totalVisits,
        List<DailyReportResponse> dailyBreakdown
) {
}
