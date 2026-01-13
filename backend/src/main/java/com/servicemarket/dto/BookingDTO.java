package com.servicemarket.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BookingDTO {
    private UUID id;

    @NotNull(message = "A data do agendamento é obrigatória")
    @Future(message = "A data de agendamento deve ser futura")
    private LocalDateTime bookingDate;

    @NotNull(message = "O ID do cliente é obrigatório")
    private UUID clientId;

    @NotNull(message = "O ID do serviço é obrigatório")
    private UUID serviceId;

    private String status;
}
