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

    public List<Services> findAll() {

        return repository.findAll();
    }
}
