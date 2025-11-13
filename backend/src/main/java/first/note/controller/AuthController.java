package first.note.controller;


import first.note.dto.UpdateUserRequest;
import first.note.model.User;
import first.note.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return service.login(email, password);
    }
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest request) {
        return service.updateUser(id, request);
    }
}
