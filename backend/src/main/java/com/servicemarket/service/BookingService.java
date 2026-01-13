package com.servicemarket.service;

import com.servicemarket.dto.BookingDTO;
import com.servicemarket.model.Booking;
import com.servicemarket.model.BookingStatus;
import com.servicemarket.model.User;
import com.servicemarket.repository.BookingRepository;
import com.servicemarket.repository.ServiceRepository;
import com.servicemarket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public List<BookingDTO> findByClient(UUID clientId) {
        return bookingRepository.findByClientId(clientId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookingDTO> findByProvider(UUID providerId) {
        return bookingRepository.findByServiceProviderId(providerId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO updateStatus(UUID bookingId, String status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        booking.setStatus(BookingStatus.valueOf(status.toUpperCase()));
        Booking saved = bookingRepository.save(booking);
        return convertToDTO(saved);
    }

    public BookingDTO create(BookingDTO dto) {
        User client = userRepository.findById(dto.getClientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        com.servicemarket.model.Service service = serviceRepository.findById(dto.getServiceId())
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));

        if (service.getProvider().getId().equals(client.getId())) {
            throw new RuntimeException("Um prestador não pode agendar o próprio serviço");
        }

        if (bookingRepository.existsByServiceProviderIdAndBookingDate(service.getProvider().getId(),
                dto.getBookingDate())) {
            throw new RuntimeException("Já existe um agendamento para este prestador neste horário");
        }

        Booking booking = new Booking();
        booking.setBookingDate(dto.getBookingDate());
        booking.setClient(client);
        booking.setService(service);
        booking.setStatus(BookingStatus.PENDING);

        Booking saved = bookingRepository.save(booking);
        return convertToDTO(saved);
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setId(booking.getId());
        dto.setBookingDate(booking.getBookingDate());
        dto.setClientId(booking.getClient().getId());
        dto.setServiceId(booking.getService().getId());
        dto.setStatus(booking.getStatus().name());
        return dto;
    }
}
