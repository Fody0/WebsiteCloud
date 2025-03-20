package Kara.CloudCom.repository;

import Kara.CloudCom.Model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Repository
public class InMemoryUserDAO {
    private final List<User> UserS = new ArrayList<>();

    public List<User> findAllUser() {
        return UserS;
    }

    public User saveUser(User User) {
        UserS.add(User);
        return User;
    }
    public User findByEmail(String email) {
        return UserS.stream()
                .filter(User -> User.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }

    public User updateUser(User User) {
        var UserIndex = IntStream.range(0,UserS.size())
                .filter(index -> UserS.get(index).getEmail().equals(User.getEmail()))
                .findFirst()
                .orElse(-1);
        if(UserIndex > -1) {
            UserS.set(UserIndex, User);
            return User;
        }
        return null;
    }

    public void deleteUser(String email) {
        var User = findByEmail(email);
        if(User != null) {
            UserS.remove(User);
        }
    }
}
