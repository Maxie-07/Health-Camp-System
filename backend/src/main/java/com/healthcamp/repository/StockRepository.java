package com.healthcamp.repository;

import com.healthcamp.model.entity.StockItem;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<StockItem, Long> {

    Optional<StockItem> findBySku(String sku);

    List<StockItem> findByLowStockTrue();
}
