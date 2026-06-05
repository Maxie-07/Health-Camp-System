package com.healthcamp.service.impl;

import com.healthcamp.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class SmsServiceImpl implements SmsService {

    private static final Logger log = LoggerFactory.getLogger(SmsServiceImpl.class);

    @Override
    @Async("taskExecutor")
    public void sendLowStockAlert(String phone, String message) {
        log.info("Mock SMS to {}: {}", phone, message);
    }
}
