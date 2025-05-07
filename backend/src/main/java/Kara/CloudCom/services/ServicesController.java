package Kara.CloudCom.services;

import Kara.CloudCom.auth.AuthenticationResponse;
import Kara.CloudCom.auth.AuthenticationService;
import Kara.CloudCom.auth.RegisterRequest;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/services")
@AllArgsConstructor
public class ServicesController {

    private final ServicesService service;

    @GetMapping
    public List<Services> findAll () {
        System.out.println("-------Here");
        return service.findAll();
    }

    @GetMapping("/{service_name}")
    public List<ServicesField> findByFieldSereviceName(@PathVariable String service_name){
        return service.findFieldsByServiceName(service_name);
    }

}
