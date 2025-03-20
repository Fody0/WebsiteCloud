package Kara.CloudCom.Service;

import Kara.CloudCom.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> findAllUser();
    User saveUser(User User);
    User findByEmail(String email);
    User updateUser(User User);
    void deleteUser(String email);
}
