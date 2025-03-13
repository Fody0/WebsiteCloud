package Kara.CloudCom.impl;

import Kara.CloudCom.Model.Student;
import Kara.CloudCom.Service.StudentService;
import Kara.CloudCom.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Primary
public class StudentServiceImpl implements StudentService {
    private final StudentRepository rep;

    @Override
    public List<Student> findAllStudent() {
        return rep.findAll();
    }

    @Override
    public Student saveStudent(Student student) {
        return rep.save(student);
    }

    @Override
    public Student findByEmail(String email) {
        return rep.findByEmail(email);
    }

    @Override
    public Student updateStudent(Student student) {
        return rep.save(student);
    }

    @Override
    @Transactional
    public void deleteStudent(String email) {
        rep.deleteByEmail(email);

    }
}
