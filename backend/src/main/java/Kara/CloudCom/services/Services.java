package Kara.CloudCom.services;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity

@Table(name = "_services")
public class Services {
    @Id
    @GeneratedValue
    Integer id;
    @Column(nullable = false)
    String name;
    String description;
}
