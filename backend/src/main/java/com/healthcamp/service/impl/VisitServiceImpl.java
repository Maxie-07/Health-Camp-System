package com.healthcamp.service.impl;

import com.healthcamp.exception.ResourceNotFoundException;
import com.healthcamp.model.dto.request.VisitRequest;
import com.healthcamp.model.dto.response.VisitResponse;
import com.healthcamp.model.entity.Beneficiary;
import com.healthcamp.model.entity.User;
import com.healthcamp.model.entity.Visit;
import com.healthcamp.repository.BeneficiaryRepository;
import com.healthcamp.repository.UserRepository;
import com.healthcamp.repository.VisitRepository;
import com.healthcamp.service.VisitService;
import com.healthcamp.util.DateUtil;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class VisitServiceImpl implements VisitService {

    private final VisitRepository visitRepository;
    private final BeneficiaryRepository beneficiaryRepository;
    private final UserRepository userRepository;

    public VisitServiceImpl(VisitRepository visitRepository,
                            BeneficiaryRepository beneficiaryRepository,
                            UserRepository userRepository) {
        this.visitRepository = visitRepository;
        this.beneficiaryRepository = beneficiaryRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<VisitResponse> findAll() {
        return visitRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VisitResponse> findByBeneficiaryId(Long beneficiaryId) {
        return visitRepository.findByBeneficiaryId(beneficiaryId).stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public VisitResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Override
    public VisitResponse create(VisitRequest request, String staffUsername) {
        Visit visit = new Visit();
        applyRequest(visit, request);
        userRepository.findByUsername(staffUsername).ifPresent(visit::setStaffUser);
        return toResponse(visitRepository.save(visit));
    }

    @Override
    public VisitResponse update(Long id, VisitRequest request) {
        Visit visit = getEntity(id);
        applyRequest(visit, request);
        return toResponse(visitRepository.save(visit));
    }

    @Override
    public void delete(Long id) {
        if (!visitRepository.existsById(id)) {
            throw new ResourceNotFoundException("Visit not found: " + id);
        }
        visitRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public long countTodayVisits() {
        LocalDate today = LocalDate.now();
        return visitRepository.countByVisitDateBetween(
                DateUtil.startOfDayUtc(today),
                DateUtil.endOfDayUtc(today));
    }

    @Override
    @Transactional(readOnly = true)
    public List<VisitResponse> findUpdatedSince(Instant since) {
        return visitRepository.findByUpdatedAtAfter(since).stream().map(this::toResponse).toList();
    }

    private Visit getEntity(Long id) {
        return visitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Visit not found: " + id));
    }

    private void applyRequest(Visit visit, VisitRequest request) {
        Beneficiary beneficiary = beneficiaryRepository.findById(request.beneficiaryId())
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiary not found: " + request.beneficiaryId()));
        visit.setBeneficiary(beneficiary);
        visit.setVisitDate(request.visitDate() != null ? request.visitDate() : Instant.now());
        visit.setVitals(request.vitals());
        visit.setDiagnosis(request.diagnosis());
        visit.setTreatment(request.treatment());
    }

    private VisitResponse toResponse(Visit visit) {
        User staff = visit.getStaffUser();
        return new VisitResponse(
                visit.getId(),
                visit.getBeneficiary().getId(),
                visit.getBeneficiary().getFullName(),
                visit.getVisitDate(),
                visit.getVitals(),
                visit.getDiagnosis(),
                visit.getTreatment(),
                staff != null ? staff.getUsername() : null,
                visit.getCreatedAt(),
                visit.getUpdatedAt());
    }
}
