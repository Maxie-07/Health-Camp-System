package com.healthcamp.service.impl;

import com.healthcamp.exception.BadRequestException;
import com.healthcamp.exception.ResourceNotFoundException;
import com.healthcamp.model.dto.request.StockItemRequest;
import com.healthcamp.model.dto.response.StockItemResponse;
import com.healthcamp.model.entity.StockItem;
import com.healthcamp.repository.StockRepository;
import com.healthcamp.service.StockService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class StockServiceImpl implements StockService {

    private final StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<StockItemResponse> findAll() {
        return stockRepository.findAll().stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public StockItemResponse findById(Long id) {
        return toResponse(getEntity(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<StockItemResponse> findLowStock() {
        return stockRepository.findByLowStockTrue().stream().map(this::toResponse).toList();
    }

    @Override
    public StockItemResponse create(StockItemRequest request) {
        stockRepository.findBySku(request.sku()).ifPresent(item -> {
            throw new BadRequestException("SKU already exists: " + request.sku());
        });
        StockItem item = new StockItem();
        applyRequest(item, request);
        return toResponse(stockRepository.save(item));
    }

    @Override
    public StockItemResponse update(Long id, StockItemRequest request) {
        StockItem item = getEntity(id);
        applyRequest(item, request);
        return toResponse(stockRepository.save(item));
    }

    @Override
    public void delete(Long id) {
        if (!stockRepository.existsById(id)) {
            throw new ResourceNotFoundException("Stock item not found: " + id);
        }
        stockRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public long countLowStock() {
        return stockRepository.findByLowStockTrue().size();
    }

    private StockItem getEntity(Long id) {
        return stockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Stock item not found: " + id));
    }

    private void applyRequest(StockItem item, StockItemRequest request) {
        item.setName(request.name());
        item.setSku(request.sku());
        item.setQuantity(request.quantity());
        item.setMinThreshold(request.minThreshold());
        item.setUnit(request.unit());
    }

    private StockItemResponse toResponse(StockItem item) {
        return new StockItemResponse(
                item.getId(),
                item.getName(),
                item.getSku(),
                item.getQuantity(),
                item.getMinThreshold(),
                item.getUnit(),
                item.isLowStock(),
                item.getCreatedAt(),
                item.getUpdatedAt());
    }
}
