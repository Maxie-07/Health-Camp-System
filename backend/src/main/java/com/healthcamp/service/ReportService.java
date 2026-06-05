package com.healthcamp.service;

import com.healthcamp.model.dto.response.DailyReportResponse;
import com.healthcamp.model.dto.response.StockSummaryResponse;
import com.healthcamp.model.dto.response.WeeklyReportResponse;
import java.time.LocalDate;

public interface ReportService {

    DailyReportResponse getDailyReport(LocalDate date);

    WeeklyReportResponse getWeeklyReport(LocalDate weekStart);

    StockSummaryResponse getStockSummary();
}
