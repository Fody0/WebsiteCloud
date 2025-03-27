package Kara.CloudCom.Controller;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/session")

public class SessionTestController {

    @PostMapping("/set")
    public String setSession(HttpSession session,
                             @RequestParam String key,
                             @RequestParam String value) {
        session.setAttribute(key, value);
        return "Данные сохранены: " + key + " = " + value;
    }

    @GetMapping("/get")
    public String getSession(HttpSession session, @RequestParam String key) {
        String value = (String) session.getAttribute(key);
        return "Значение из сессии: " + value;
    }
}
