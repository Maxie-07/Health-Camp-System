package com.healthcamp.model.dto.request;

import java.util.List;

public record SyncPushRequest(
        List<BeneficiaryRequest> beneficiaries,
        List<VisitRequest> visits
) {
}
