package com.healthcamp.repository;

import com.healthcamp.model.entity.Visit;
import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    List<Visit> findByBeneficiaryId(Long beneficiaryId);

    @Query("SELECT v FROM Visit v WHERE v.visitDate >= :start AND v.visitDate < :end")
    List<Visit> findByVisitDateBetween(@Param("start") Instant start, @Param("end") Instant end);

    @Query("SELECT COUNT(v) FROM Visit v WHERE v.visitDate >= :start AND v.visitDate < :end")
    long countByVisitDateBetween(@Param("start") Instant start, @Param("end") Instant end);

    List<Visit> findByUpdatedAtAfter(Instant since);
}
