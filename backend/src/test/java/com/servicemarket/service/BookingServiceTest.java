package com.servicemarket.service;

import com.servicemarket.dto.BookingDTO;
import com.servicemarket.model.BookingStatus;
import com.servicemarket.model.User;
import com.servicemarket.model.UserProfile;
import com.servicemarket.repository.BookingRepository;
import com.servicemarket.repository.ServiceRepository;
import com.servicemarket.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    @Mock
    private BookingRepository bookingRepository;
    @Mock
    private ServiceRepository serviceRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private BookingService bookingService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldThrowExceptionWhenConflictExists() {
        UUID clientId = UUID.randomUUID();
        UUID providerId = UUID.randomUUID();
        UUID serviceId = UUID.randomUUID();
        LocalDateTime bookingDate = LocalDateTime.now().plusDays(1);

        BookingDTO dto = new BookingDTO();
        dto.setClientId(clientId);
        dto.setServiceId(serviceId);
        dto.setBookingDate(bookingDate);

        User client = new User();
        client.setId(clientId);

        User provider = new User();
        provider.setId(providerId);

        com.servicemarket.model.Service service = new com.servicemarket.model.Service();
        service.setId(serviceId);
        service.setProvider(provider);

        when(userRepository.findById(clientId)).thenReturn(Optional.of(client));
        when(serviceRepository.findById(serviceId)).thenReturn(Optional.of(service));

        // Simular que já existe um agendamento no mesmo horário
        when(bookingRepository.existsByServiceProviderIdAndBookingDate(providerId, bookingDate))
                .thenReturn(true);

        assertThrows(RuntimeException.class, () -> bookingService.create(dto));
    }
}
