package com.healthcamp.service;

import com.healthcamp.model.dto.request.VisitRequest;
import com.healthcamp.model.dto.response.VisitResponse;
import java.time.Instant;
import java.util.List;

public interface VisitService {

    List<VisitResponse> findAll();

    List<VisitResponse> findByBeneficiaryId(Long beneficiaryId);

    VisitResponse findById(Long id);

    VisitResponse create(VisitRequest request, String staffUsername);

    VisitResponse update(Long id, VisitRequest request);

    void delete(Long id);

    long countTodayVisits();

    List<VisitResponse> findUpdatedSince(Instant since);
}
