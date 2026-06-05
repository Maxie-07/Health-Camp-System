package com.healthcamp.service;

import com.healthcamp.model.dto.request.StockItemRequest;
import com.healthcamp.model.dto.response.StockItemResponse;
import java.util.List;

public interface StockService {

    List<StockItemResponse> findAll();

    StockItemResponse findById(Long id);

    List<StockItemResponse> findLowStock();

    StockItemResponse create(StockItemRequest request);

    StockItemResponse update(Long id, StockItemRequest request);

    void delete(Long id);

    long countLowStock();
}
