package Kara.CloudCom.Controller;

import Kara.CloudCom.Model.Student;
import Kara.CloudCom.Service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService service_a;

    @GetMapping()
    public List<Student> findAllStudent() {
        //TODO
        return service_a.findAllStudent();
    }
    @PostMapping("save_student")
    public String saveStudent(@RequestBody Student student) {
        service_a.saveStudent(student);
        return "user successfully saved";
    }
    @GetMapping("/{email}")
    public Student findStudentByIEmail(@PathVariable String email) {
        return service_a.findByEmail(email);
    }
    @PutMapping("update_student")
    public Student updateStudent(Student student) {
        return service_a.updateStudent(student);
    }
    @DeleteMapping("delete_student/{email}")
    public void deleteStudent(@PathVariable String email) {
        service_a.deleteStudent(email);
    }
}
