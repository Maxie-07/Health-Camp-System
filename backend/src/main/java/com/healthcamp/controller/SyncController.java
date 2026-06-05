package com.healthcamp.controller;

import com.healthcamp.model.dto.request.SyncPushRequest;
import com.healthcamp.model.dto.response.SyncPullResponse;
import com.healthcamp.service.SyncService;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sync")
public class SyncController {

    private final SyncService syncService;

    public SyncController(SyncService syncService) {
        this.syncService = syncService;
    }

    @GetMapping("/pull")
    SyncPullResponse pull(@RequestParam(required = false) Instant since) {
        return syncService.pull(since);
    }

    @PostMapping("/push")
    @ResponseStatus(HttpStatus.ACCEPTED)
    void push(@RequestBody SyncPushRequest request, @AuthenticationPrincipal UserDetails user) {
        syncService.push(request, user.getUsername());
    }
}
