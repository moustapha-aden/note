package first.note.controller;
import first.note.model.Note;
import first.note.model.User;
import first.note.repository.NoteRepository;
import first.note.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

@CrossOrigin(
        origins = "http://localhost:5173",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowedHeaders = "*"
)

@RestController                     // <- IMPORTANT
@RequestMapping("/api/notes")       // <- Définit le chemin de base

public class NoteController {

    private final NoteRepository noteRepo;
    private final UserRepository userRepo;

    public NoteController(NoteRepository noteRepo, UserRepository userRepo) {
        this.noteRepo = noteRepo;
        this.userRepo = userRepo;
    }
    @GetMapping("/{userId}")
    public List<Note> getUserTodos(@PathVariable Long userId) {
        User user = userRepo.findById(userId).orElseThrow();
        return noteRepo.findByUser(user);
    }

    @PostMapping
    public Note createTodo(@RequestBody Map<String, String> body) {
        Long userId = Long.valueOf(body.get("userId"));
        User user = userRepo.findById(userId).orElseThrow();

        Note note = new Note();
        note.setTitre(body.get("title"));
        note.setDescription(body.get("description"));
        note.setCreatedAt(LocalDateTime.now());
        note.setUser(user);

        return noteRepo.save(note);
    }
    @PutMapping("/{id}")
    public Note update(@PathVariable Long id, @RequestBody Note newNote) {
        Note note = noteRepo.findById(id).orElseThrow();
        note.setTitre(newNote.getTitre());
        note.setDescription(newNote.getDescription());
        return noteRepo.save(note);
    }
    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        noteRepo.deleteById(id);
    }


}
