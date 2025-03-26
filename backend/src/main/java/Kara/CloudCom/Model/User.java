package Kara.CloudCom.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.time.Period;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String surname;
//    private LocalDate dateOfBirth;
    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String password;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    //    @Transient
//    private int age;

//    public int getAge() {
//        return Period.between(dateOfBirth, LocalDate.now()).getYears();
//    }
}
