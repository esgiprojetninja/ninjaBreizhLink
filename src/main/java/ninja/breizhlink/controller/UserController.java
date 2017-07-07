package ninja.breizhlink.controller;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://breizh.link")
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;


    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity addNewUser(@ModelAttribute User user, String passwordConfirm) {
        User userToSave = new User();
        if (user.getPwd().compareTo(passwordConfirm) == 0) {
            passwordEncoder = new BCryptPasswordEncoder();
            userToSave.setLogin(user.getLogin());
            userToSave.setEmail(user.getEmail());
            userToSave.setPwd(passwordEncoder.encode(user.getPwd()));
            User savedUser = userRepository.save(userToSave);
            if (savedUser != null) {
                return new ResponseEntity<>(savedUser, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Couldn't save",HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("Password don't match", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        System.out.println("==== in get all ====");
        return userRepository.findAll();
    }
}
