package Kara.CloudCom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import Kara.CloudCom.Model.Student;
import org.springframework.stereotype.Repository;


public interface StudentRepository extends JpaRepository<Student, Long> {
    void deleteByEmail(String email);
    Student findByEmail(String email);

}
