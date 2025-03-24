package Kara.CloudCom.Service;

import Kara.CloudCom.Model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> findAllUser();
    User saveUser(User User);
    User findByEmail(String email);
    User confirmUserPassword(String password);
    User updateUser(User User);
    void deleteUser(String email);
    boolean checkPassword(User foundUser, String password);

}
