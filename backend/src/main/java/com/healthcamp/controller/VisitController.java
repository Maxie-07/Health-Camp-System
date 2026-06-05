package com.healthcamp.controller;

import com.healthcamp.model.dto.request.VisitRequest;
import com.healthcamp.model.dto.response.VisitResponse;
import com.healthcamp.service.VisitService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    private final VisitService visitService;

    public VisitController(VisitService visitService) {
        this.visitService = visitService;
    }

    @GetMapping
    List<VisitResponse> findAll(@RequestParam(required = false) Long beneficiaryId) {
        if (beneficiaryId != null) {
            return visitService.findByBeneficiaryId(beneficiaryId);
        }
        return visitService.findAll();
    }

    @GetMapping("/{id}")
    VisitResponse findById(@PathVariable Long id) {
        return visitService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    VisitResponse create(@Valid @RequestBody VisitRequest request,
                         @AuthenticationPrincipal UserDetails user) {
        return visitService.create(request, user.getUsername());
    }

    @PutMapping("/{id}")
    VisitResponse update(@PathVariable Long id, @Valid @RequestBody VisitRequest request) {
        return visitService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id) {
        visitService.delete(id);
    }
}
