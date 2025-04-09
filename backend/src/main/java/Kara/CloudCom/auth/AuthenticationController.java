package Kara.CloudCom.auth;

import Kara.CloudCom.services.ServicesField;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register (
            @RequestBody RegisterRequest request
    ){
        System.out.println("-------Here");
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/logout")
    public String logout (){
        return "Successfully logged out";
    }

    @PostMapping("/register_personal")
    public void createUserWithPersonalData(
            @RequestBody UserDataRequest request_data,
            HttpServletRequest httpRequest
    ) {
//        System.out.println("--------------Success----------------------");
        service.userWithPersonalData(request_data, httpRequest);
    }

    @GetMapping("/register_personal")
    public PersonalData findPersonalData(HttpServletRequest httpRequest){

        return service.findPersonalData(httpRequest);
    }

}
