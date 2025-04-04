package Kara.CloudCom.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "_required_data")
public class RequiredData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "field_id")
    private Integer fieldId;

    @Column(name = "field_data", nullable = false)
    private String fieldData;

    @OneToMany(mappedBy = "field")
    @JsonIgnore 
    private List<ServicesField> serviceFields;



}
