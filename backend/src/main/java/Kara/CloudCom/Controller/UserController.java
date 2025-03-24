package Kara.CloudCom.Controller;

import Kara.CloudCom.Model.Requests.LoginRequest;
import Kara.CloudCom.Model.User;
import Kara.CloudCom.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Users")
@AllArgsConstructor
public class UserController {

    private final UserService service_a;
    private final BCryptPasswordEncoder passwordEncoder;

    @GetMapping()
    public List<User> findAllUser() {
        //TODO
        return service_a.findAllUser();
    }

    @PostMapping("save_user")
    @CrossOrigin(origins = "http://localhost:3000/",
            methods = {RequestMethod.POST}, allowCredentials = "true")
    public String saveUser(@RequestBody User user) {
        // Хешируем пароль перед сохранением
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        service_a.saveUser(user);
        return "user successfully saved";
    }

    @GetMapping("/login")
    public User loginUser(@RequestBody LoginRequest email) {
        User foundUser = service_a.findByEmail(email.getEmail());
        // Проверяем совпадение хешей паролей
        if (foundUser != null && passwordEncoder.matches(email.getPassword(), foundUser.getPassword())) {
            return foundUser;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }
}

//    @PutMapping("update_User")
//    public User updateUser(User User) {
//        return service_a.updateUser(User);
//    }
//    @DeleteMapping("delete_User/{email}")
//    public void deleteUser(@PathVariable String email) {
//        service_a.deleteUser(email);
//    }
//}
