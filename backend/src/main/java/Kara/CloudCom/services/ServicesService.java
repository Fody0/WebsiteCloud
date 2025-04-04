package Kara.CloudCom.services;

import Kara.CloudCom.user.UserRepository;
import Kara.CloudCom.services.ServicesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicesService {
    private final ServicesRepository repository;

    private final ServiceToFieldRepository serviceToFieldRepository;

    public List<Services> findAll() {

        return repository.findAll();
    }

    public List<ServicesField> findFieldsByServiceName(String serviceName) {
        return serviceToFieldRepository.findFieldsByServiceName(serviceName);
    }
}
