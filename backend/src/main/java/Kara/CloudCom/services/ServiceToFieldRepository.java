package Kara.CloudCom.services;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import Kara.CloudCom.services.ServicesFieldKey;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceToFieldRepository extends JpaRepository<ServicesField, String> {

    @Query("SELECT sf FROM ServicesField sf " +
            "WHERE sf.service.id = " +
            "(SELECT s.id FROM Services s WHERE s.name = :serviceName)")
    List<ServicesField> findFieldsByServiceName(@Param("serviceName") String serviceName);
}