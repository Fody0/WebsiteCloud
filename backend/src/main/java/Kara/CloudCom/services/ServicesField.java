package Kara.CloudCom.services;


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
    private Services service;

    @ManyToOne
    @MapsId("fieldId")
    @JoinColumn(name = "field_id")
    private RequiredData field;
}


