package com.healthcamp.service.impl;

import com.healthcamp.exception.ResourceNotFoundException;
import com.healthcamp.model.dto.request.BeneficiaryRequest;
import com.healthcamp.model.dto.response.BeneficiaryResponse;
import com.healthcamp.model.entity.Beneficiary;
import com.healthcamp.repository.BeneficiaryRepository;
import com.healthcamp.service.BeneficiaryService;
import com.healthcamp.util.QRCodeGenerator;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final BeneficiaryRepository beneficiaryRepository;
    private final QRCodeGenerator qrCodeGenerator;

    public BeneficiaryServiceImpl(BeneficiaryRepository beneficiaryRepository,
                                  QRCodeGenerator qrCodeGenerator) {
        this.beneficiaryRepository = beneficiaryRepository;
        this.qrCodeGenerator = qrCodeGenerator;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BeneficiaryResponse> findAll() {
        return beneficiaryRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BeneficiaryResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Override
    @Transactional(readOnly = true)
    public BeneficiaryResponse findByQrCode(String qrCode) {
        Beneficiary beneficiary = beneficiaryRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found for QR: " + qrCode));
        return toResponse(beneficiary);
    }

    @Override
    public BeneficiaryResponse create(BeneficiaryRequest request) {
        Beneficiary beneficiary = new Beneficiary();
        applyRequest(beneficiary, request);
        beneficiary.setQrCode(qrCodeGenerator.generateUniqueCode());
        return toResponse(beneficiaryRepository.save(beneficiary));
    }

    @Override
    public BeneficiaryResponse update(Long id, BeneficiaryRequest request) {
        Beneficiary beneficiary = getEntity(id);
        applyRequest(beneficiary, request);
        return toResponse(beneficiaryRepository.save(beneficiary));
    }

    @Override
    public void delete(Long id) {
        if (!beneficiaryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Beneficiary not found: " + id);
        }
        beneficiaryRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public long count() {
        return beneficiaryRepository.count();
    }

    private Beneficiary getEntity(Long id) {
        return beneficiaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found: " + id));
    }

    private void applyRequest(Beneficiary beneficiary, BeneficiaryRequest request) {
        beneficiary.setFullName(request.fullName());
        beneficiary.setPhone(request.phone());
        beneficiary.setNationalId(request.nationalId());
        beneficiary.setCampLocation(request.campLocation());
    }

    private BeneficiaryResponse toResponse(Beneficiary beneficiary) {
        return new BeneficiaryResponse(
                beneficiary.getId(),
                beneficiary.getFullName(),
                beneficiary.getPhone(),
                beneficiary.getNationalId(),
                beneficiary.getQrCode(),
                qrCodeGenerator.generateQrImageBase64(beneficiary.getQrCode()),
                beneficiary.getCampLocation(),
                beneficiary.getCreatedAt(),
                beneficiary.getUpdatedAt());
    }
}
