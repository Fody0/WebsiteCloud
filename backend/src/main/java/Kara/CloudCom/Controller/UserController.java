package Kara.CloudCom.Controller;

import Kara.CloudCom.Model.Requests.EmailRequest;
import Kara.CloudCom.Model.User;
import Kara.CloudCom.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/Users")
@AllArgsConstructor
public class UserController {

    private final UserService service_a;

    @GetMapping()
    public List<User> findAllUser() {
        //TODO
        return service_a.findAllUser();
    }
    @PostMapping("save_user")
    @CrossOrigin(origins = "http://localhost:3000/",
            methods = {RequestMethod.POST}, allowCredentials = "true")
    public String saveUser(@RequestBody User user) {
        service_a.saveUser(user);
        return "user successfully saved";
    }

    @GetMapping("/email")
    public User findUserByIEmail(@RequestBody EmailRequest email) {
        return service_a.findByEmail(email.getEmail());
    }
//    @PutMapping("update_User")
//    public User updateUser(User User) {
//        return service_a.updateUser(User);
//    }
//    @DeleteMapping("delete_User/{email}")
//    public void deleteUser(@PathVariable String email) {
//        service_a.deleteUser(email);
//    }
}
