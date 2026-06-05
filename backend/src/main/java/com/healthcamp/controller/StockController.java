package com.healthcamp.controller;

import com.healthcamp.model.dto.request.StockItemRequest;
import com.healthcamp.model.dto.response.StockItemResponse;
import com.healthcamp.service.StockService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stock")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping
    List<StockItemResponse> findAll() {
        return stockService.findAll();
    }

    @GetMapping("/low")
    List<StockItemResponse> findLowStock() {
        return stockService.findLowStock();
    }

    @GetMapping("/{id}")
    StockItemResponse findById(@PathVariable Long id) {
        return stockService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    StockItemResponse create(@Valid @RequestBody StockItemRequest request) {
        return stockService.create(request);
    }

    @PutMapping("/{id}")
    StockItemResponse update(@PathVariable Long id, @Valid @RequestBody StockItemRequest request) {
        return stockService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void delete(@PathVariable Long id) {
        stockService.delete(id);
    }
}
