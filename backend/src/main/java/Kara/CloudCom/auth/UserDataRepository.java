package Kara.CloudCom.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserDataRepository extends JpaRepository<PersonalData, String> {

    @Query("SELECT pd FROM PersonalData pd " +
            "WHERE pd.user.id = " +
            "(SELECT u.id FROM User u WHERE u.email = :userEmail)")
    PersonalData findUserByName(@Param("userEmail") String userEmail);

}
