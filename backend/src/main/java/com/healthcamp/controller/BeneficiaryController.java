package com.healthcamp.controller;

import com.healthcamp.model.dto.request.BeneficiaryRequest;
import com.healthcamp.model.dto.response.BeneficiaryResponse;
import com.healthcamp.model.dto.response.DashboardSummaryResponse;
import com.healthcamp.service.BeneficiaryService;
import com.healthcamp.service.StockService;
import com.healthcamp.service.VisitService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/beneficiaries")
public class BeneficiaryController {

    private final BeneficiaryService beneficiaryService;
    private final VisitService visitService;
    private final StockService stockService;

    public BeneficiaryController(BeneficiaryService beneficiaryService,
                                 VisitService visitService,
                                 StockService stockService) {
        this.beneficiaryService = beneficiaryService;
        this.visitService = visitService;
        this.stockService = stockService;
    }

    @GetMapping
    List<BeneficiaryResponse> findAll() {
        return beneficiaryService.findAll();
    }

    @GetMapping("/summary")
    DashboardSummaryResponse summary() {
        return new DashboardSummaryResponse(
                beneficiaryService.count(),
                visitService.countTodayVisits(),
                stockService.countLowStock());
    }

    @GetMapping("/{id}")
    BeneficiaryResponse findById(@PathVariable Long id) {
        return beneficiaryService.findById(id);
    }

    @GetMapping("/qr/{code}")
    BeneficiaryResponse findByQrCode(@PathVariable String code) {
        return beneficiaryService.findByQrCode(code);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    BeneficiaryResponse create(@Valid @RequestBody BeneficiaryRequest request) {
        return beneficiaryService.create(request);
    }

    @PutMapping("/{id}")
    BeneficiaryResponse update(@PathVariable Long id, @Valid @RequestBody BeneficiaryRequest request) {
        return beneficiaryService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id) {
        beneficiaryService.delete(id);
    }
}
