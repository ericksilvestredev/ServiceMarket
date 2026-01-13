package com.servicemarket.service;

import com.servicemarket.dto.ServiceDTO;
import com.servicemarket.model.User;
import com.servicemarket.repository.ServiceRepository;
import com.servicemarket.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;

    public List<ServiceDTO> findAll() {
        return serviceRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ServiceDTO findById(UUID id) {
        com.servicemarket.model.Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Serviço não encontrado"));
        return convertToDTO(service);
    }

    public ServiceDTO create(ServiceDTO dto) {
        User provider = userRepository.findById(dto.getProviderId())
                .orElseThrow(() -> new RuntimeException("Prestador não encontrado"));

        com.servicemarket.model.Service service = new com.servicemarket.model.Service();
        service.setName(dto.getName());
        service.setDescription(dto.getDescription());
        service.setPrice(dto.getPrice());
        service.setProvider(provider);

        com.servicemarket.model.Service saved = serviceRepository.save(service);
        return convertToDTO(saved);
    }

    private ServiceDTO convertToDTO(com.servicemarket.model.Service service) {
        ServiceDTO dto = new ServiceDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setPrice(service.getPrice());
        dto.setProviderId(service.getProvider() != null ? service.getProvider().getId() : null);
        return dto;
    }
}
