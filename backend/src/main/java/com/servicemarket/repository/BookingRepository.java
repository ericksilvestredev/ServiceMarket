package com.servicemarket.repository;

import com.servicemarket.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByClientId(UUID clientId);

    List<Booking> findByServiceProviderId(UUID providerId);

    boolean existsByServiceProviderIdAndBookingDate(UUID providerId, java.time.LocalDateTime bookingDate);
}
