package Kara.CloudCom.auth;

import Kara.CloudCom.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.processing.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_personal_data")
public class PersonalData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, length = 14)
    private String snils;

    @Column(name = "insurance_policy", unique = true, length = 16)
    private String insurancePolicy;

    @Column(name = "passport", length = 10)
    private String passport;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    @JsonBackReference
    private User user;
}