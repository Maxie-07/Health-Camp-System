package com.healthcamp.repository;

import com.healthcamp.model.entity.Beneficiary;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeneficiaryRepository extends JpaRepository<Beneficiary, Long> {

    Optional<Beneficiary> findByQrCode(String qrCode);

    long countBy();
}
