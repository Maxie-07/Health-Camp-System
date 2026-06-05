package com.healthcamp.service.impl;

import com.healthcamp.model.dto.request.SyncPushRequest;
import com.healthcamp.model.dto.response.SyncPullResponse;
import com.healthcamp.repository.BeneficiaryRepository;
import com.healthcamp.service.BeneficiaryService;
import com.healthcamp.service.StockService;
import com.healthcamp.service.SyncService;
import com.healthcamp.service.VisitService;
import java.time.Instant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SyncServiceImpl implements SyncService {

    private final BeneficiaryService beneficiaryService;
    private final VisitService visitService;
    private final StockService stockService;
    private final BeneficiaryRepository beneficiaryRepository;

    public SyncServiceImpl(BeneficiaryService beneficiaryService,
                           VisitService visitService,
                           StockService stockService,
                           BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryService = beneficiaryService;
        this.visitService = visitService;
        this.stockService = stockService;
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public SyncPullResponse pull(Instant since) {
        Instant watermark = since != null ? since : Instant.EPOCH;
        return new SyncPullResponse(
                Instant.now(),
                beneficiaryRepository.findAll().stream()
                        .filter(b -> b.getUpdatedAt().isAfter(watermark))
                        .map(b -> beneficiaryService.findById(b.getId()))
                        .toList(),
                visitService.findUpdatedSince(watermark),
                stockService.findAll());
    }

    @Override
    public void push(SyncPushRequest request, String username) {
        if (request.beneficiaries() != null) {
            request.beneficiaries().forEach(beneficiaryService::create);
        }
        if (request.visits() != null) {
            request.visits().forEach(visit -> visitService.create(visit, username));
        }
    }
}
