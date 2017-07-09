package ninja.breizhlink.controller;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://breizh.link")
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

    public static HttpSession session() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true);
    }


    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity addNewUser(@ModelAttribute User user) {
        User userToSave = new User();
        if (user.getPassword().compareTo(user.getPasswordConfirm()) == 0) {
            passwordEncoder = new BCryptPasswordEncoder();
            userToSave.setLogin(user.getLogin());
            userToSave.setEmail(user.getEmail());
            userToSave.setPassword(passwordEncoder.encode(user.getPassword()));
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

    @PostMapping(path="/login")
    public @ResponseBody
    ResponseEntity login(@ModelAttribute User user) {
        System.out.println("== in login ==");
        System.out.println(user.getPassword());
        User userToLog = userRepository.findByEmail(user.getEmail());
        System.out.println(userToLog.getPassword());
        passwordEncoder = new BCryptPasswordEncoder();
        if (userToLog == null || !passwordEncoder.matches(user.getPassword(), userToLog.getPassword())) {
            return new ResponseEntity<>("Couldn't log you in", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userToLog, HttpStatus.OK);
    }
}
