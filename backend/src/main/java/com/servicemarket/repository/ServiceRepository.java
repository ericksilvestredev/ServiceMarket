package com.servicemarket.repository;

import com.servicemarket.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, UUID> {
    List<Service> findByProviderId(UUID providerId);
}
