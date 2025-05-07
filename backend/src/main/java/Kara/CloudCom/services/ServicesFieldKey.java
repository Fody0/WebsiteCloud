package Kara.CloudCom.services;

import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
    public class ServicesFieldKey implements Serializable {

    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "field_id")
    private Integer fieldId;
    
    public ServicesFieldKey() {}

    public ServicesFieldKey(Integer serviceId, Integer fieldId) {
        this.serviceId = serviceId;
        this.fieldId = fieldId;
    }
}
