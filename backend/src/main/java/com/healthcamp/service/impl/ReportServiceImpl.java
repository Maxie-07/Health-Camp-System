package com.healthcamp.service.impl;

import com.healthcamp.model.dto.response.DailyReportResponse;
import com.healthcamp.model.dto.response.StockSummaryResponse;
import com.healthcamp.model.dto.response.WeeklyReportResponse;
import com.healthcamp.repository.VisitRepository;
import com.healthcamp.service.BeneficiaryService;
import com.healthcamp.service.ReportService;
import com.healthcamp.service.StockService;
import com.healthcamp.util.DateUtil;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ReportServiceImpl implements ReportService {

    private final VisitRepository visitRepository;
    private final BeneficiaryService beneficiaryService;
    private final StockService stockService;

    public ReportServiceImpl(VisitRepository visitRepository,
                             BeneficiaryService beneficiaryService,
                             StockService stockService) {
        this.visitRepository = visitRepository;
        this.beneficiaryService = beneficiaryService;
        this.stockService = stockService;
    }

    @Override
    public DailyReportResponse getDailyReport(LocalDate date) {
        long visits = visitRepository.countByVisitDateBetween(
                DateUtil.startOfDayUtc(date),
                DateUtil.endOfDayUtc(date));
        return new DailyReportResponse(
                date,
                visits,
                beneficiaryService.count(),
                stockService.countLowStock());
    }

    @Override
    public WeeklyReportResponse getWeeklyReport(LocalDate weekStart) {
        LocalDate normalizedStart = weekStart != null ? weekStart : LocalDate.now();
        LocalDate start = normalizedStart.minusDays(normalizedStart.getDayOfWeek().getValue() - 1L);
        List<DailyReportResponse> breakdown = new ArrayList<>();
        long totalVisits = 0;
        for (int i = 0; i < 7; i++) {
            DailyReportResponse daily = getDailyReport(start.plusDays(i));
            breakdown.add(daily);
            totalVisits += daily.totalVisits();
        }
        return new WeeklyReportResponse(start, start.plusDays(6), totalVisits, breakdown);
    }

    @Override
    public StockSummaryResponse getStockSummary() {
        var lowStock = stockService.findLowStock();
        return new StockSummaryResponse(stockService.findAll().size(), lowStock.size(), lowStock);
    }
}
