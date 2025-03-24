package Kara.CloudCom.Controller;

import Kara.CloudCom.Model.Requests.EmailRequest;
import Kara.CloudCom.Model.Requests.LoginRequest;
import Kara.CloudCom.Model.User;
import Kara.CloudCom.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Users")
public class UserController {



    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping()
    public List<User> findAllUser() {
        //TODO
        return service.findAllUser();
    }

    @PostMapping("save_user")
    public String saveUser(@RequestBody User user) {
        System.out.println(user);
        service.saveUser(user);
        return "user successfully saved";
    }

    @PostMapping("login")
    public User loginUser(@RequestBody LoginRequest email) {
        User foundUser = service.findByEmail(email.getEmail());
        if (foundUser != null && foundUser.getPassword().equals(email.getPassword())) {
            return foundUser;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }
    }//    @PutMapping("update_User")
//    public User updateUser(User User) {
//        return service_a.updateUser(User);
//    }
//    @DeleteMapping("delete_User/{email}")
//    public void deleteUser(@PathVariable String email) {
//        service_a.deleteUser(email);
//    }
}
