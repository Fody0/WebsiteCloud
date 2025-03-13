package Kara.CloudCom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Kara.CloudCom.Model.User;


public interface UserRepository extends JpaRepository<User, Long> {
    void deleteByEmail(String email);
    User findByEmail(String email);

}
