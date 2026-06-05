package com.healthcamp.service;

import com.healthcamp.model.dto.request.BeneficiaryRequest;
import com.healthcamp.model.dto.response.BeneficiaryResponse;
import java.util.List;

public interface BeneficiaryService {

    List<BeneficiaryResponse> findAll();

    BeneficiaryResponse findById(Long id);

    BeneficiaryResponse findByQrCode(String qrCode);

    BeneficiaryResponse create(BeneficiaryRequest request);

    BeneficiaryResponse update(Long id, BeneficiaryRequest request);

    void delete(Long id);

    long count();
}
