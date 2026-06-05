package com.healthcamp.service;

import com.healthcamp.model.dto.request.SyncPushRequest;
import com.healthcamp.model.dto.response.SyncPullResponse;
import java.time.Instant;

public interface SyncService {

    SyncPullResponse pull(Instant since);

    void push(SyncPushRequest request, String username);
}
