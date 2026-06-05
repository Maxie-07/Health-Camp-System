package com.healthcamp.model.dto.request;

import com.healthcamp.model.enums.StockUnit;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record StockItemRequest(
        @NotBlank String name,
        @NotBlank String sku,
        @Min(0) int quantity,
        @Min(0) int minThreshold,
        @NotNull StockUnit unit
) {
}
