package Kara.CloudCom.impl;

import Kara.CloudCom.Model.User;
import Kara.CloudCom.Service.UserService;
import Kara.CloudCom.repository.InMemoryUserDAO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InMemoryUserServiceImpl implements UserService {
    private final InMemoryUserDAO repository;
    @Override
    public List<User> findAllUser() {
        return repository.findAllUser();
    }
    @Override
    public User saveUser(User User) {
        return repository.saveUser(User);
    }

    @Override
    public User findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public User updateUser(User User) {
        return repository.updateUser(User);
    }

    @Override
    public void deleteUser(String email) {
        repository.deleteUser(email);
    }
}
