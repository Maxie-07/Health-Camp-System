package com.healthcamp.service;

public interface SmsService {

    void sendLowStockAlert(String phone, String message);
}
