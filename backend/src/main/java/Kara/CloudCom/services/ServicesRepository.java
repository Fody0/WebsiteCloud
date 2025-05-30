package Kara.CloudCom.services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ServicesRepository extends JpaRepository<Services, Integer> {
    Optional<Services> findByName(String name);

//    Optional<Services> findByServiceName(String serviceName);

    @Query("SELECT s FROM Services s LEFT JOIN FETCH s.serviceFields WHERE s.name = :name")
    Optional<Services> findByNameWithFields(@Param("name") String name);
}