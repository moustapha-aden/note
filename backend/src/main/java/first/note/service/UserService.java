package first.note.service;

import first.note.dto.UpdateUserRequest;
import first.note.model.User;
import first.note.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public User login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> encoder.matches(password, u.getPassword()))
                .orElse(null);
    }

    public User updateUser(Long id, UpdateUserRequest request) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (request.getName() != null) {
            user.setUserName(request.getName());
        }

        if (request.getEmail() != null) {
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null) {
            user.setPassword(encoder.encode(request.getPassword()));
        }

        return repo.save(user);
    }

}
