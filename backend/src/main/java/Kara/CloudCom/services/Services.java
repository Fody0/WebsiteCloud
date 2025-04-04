package Kara.CloudCom.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "_services")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(nullable = false)
    String name;

    String description;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
//    @JsonIgnore // ← Эта аннотация здесь
    private List<ServicesField> serviceFields;
}
