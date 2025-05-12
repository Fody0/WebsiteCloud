package Kara.CloudCom.auth;

import Kara.CloudCom.config.JwtService;
import Kara.CloudCom.user.Role;
import Kara.CloudCom.user.User;
import Kara.CloudCom.user.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final UserDataRepository dataRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(RegisterRequest request) {

        var user = User.builder()
                .name(request.getName())
                .surname(request.getSurname())
                .middle_name(request.getMiddle_name())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.User)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .middle_name(request.getMiddle_name())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .name(user.getName())
                .surname(user.getSurname())
                .middle_name(user.getMiddle_name())
                .build();
    }

    public void userWithPersonalData(UserDataRequest request, HttpServletRequest httpRequest) {
        final String authHeader = httpRequest.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;
        jwtToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtToken);
        var user = repository.findByEmail(userEmail).orElseThrow();

        PersonalData personalData;

        if (dataRepository.findUserByName(user.getEmail()) != null) {
            personalData = dataRepository.findUserByName(user.getEmail());
            personalData.setPassport(request.getPassport());
            personalData.setSnils(request.getSnils());
            personalData.setInsurancePolicy(request.getInsurancePolicy());

        }
        else{
           personalData = PersonalData.builder()
                    .snils(request.getSnils())
                    .insurancePolicy(request.getInsurancePolicy())
                    .passport(request.getPassport())
                    .user(user)
                    .build();

        }

        user.setPersonalData(personalData);
        repository.save(user);


    }

    public PersonalData findPersonalData(HttpServletRequest httpRequest)
    {
        final String authHeader = httpRequest.getHeader("Authorization");
        final String jwtToken;
        final String userEmail;
        jwtToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(jwtToken);
        var user = repository.findByEmail(userEmail).orElseThrow();

        return dataRepository.findUserByName(user.getEmail());
    }

}
