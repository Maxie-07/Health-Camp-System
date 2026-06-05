package com.healthcamp.controller;

import com.healthcamp.model.dto.response.DailyReportResponse;
import com.healthcamp.model.dto.response.StockSummaryResponse;
import com.healthcamp.model.dto.response.WeeklyReportResponse;
import com.healthcamp.service.ReportService;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/daily")
    DailyReportResponse daily(@RequestParam(required = false)
                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return reportService.getDailyReport(date != null ? date : LocalDate.now());
    }

    @GetMapping("/weekly")
    WeeklyReportResponse weekly(@RequestParam(required = false)
                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate weekStart) {
        return reportService.getWeeklyReport(weekStart);
    }

    @GetMapping("/stock-summary")
    StockSummaryResponse stockSummary() {
        return reportService.getStockSummary();
    }
}
