package Kara.CloudCom.services;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "_service_field")
public class ServicesField {

    @EmbeddedId
    private ServicesFieldKey id;

    @ManyToOne
    @MapsId("serviceId")
    @JoinColumn(name = "service_id")
    @JsonBackReference
    private Services service;

    @ManyToOne
    @MapsId("fieldId")
    @JoinColumn(name = "field_id")
    private RequiredData field;
}


