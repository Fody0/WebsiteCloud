package Kara.CloudCom.services;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "service_fields")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicesField {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String fieldKey;

    private String fieldValue;

    @Enumerated(EnumType.STRING)
    private FieldType fieldType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id")
    private Services service;

    public enum FieldType {
        STRING, NUMBER, BOOLEAN, DATE
    }
}


