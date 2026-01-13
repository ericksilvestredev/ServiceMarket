package com.servicemarket.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
public class ServiceDTO {
    private UUID id;

    @NotBlank(message = "O nome do serviço é obrigatório")
    private String name;

    private String description;

    @NotNull(message = "O preço é obrigatório")
    @Positive(message = "O preço deve ser um valor positivo")
    private BigDecimal price;

    @NotNull(message = "O ID do prestador é obrigatório")
    private UUID providerId;
}
