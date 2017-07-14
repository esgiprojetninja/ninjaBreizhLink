package ninja.breizhlink.controller;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import ninja.breizhlink.utils.SessionIdentifierManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private SessionIdentifierManager sessionIdentifierManager;

    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity addNewUser(@ModelAttribute User user, @CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        if (userRepository.findBySessionID(sessionIDCookie) != null) {
            return new ResponseEntity<>(
                    "You are already logged in !",
                    sessionIdentifierManager.getHeaderWithSessionIDCookie(sessionIDCookie),
                    HttpStatus.OK
            );
        }
        User userToSave = new User();
        if (user.getPassword().compareTo(user.getPasswordConfirm()) == 0) {
            passwordEncoder = new BCryptPasswordEncoder();
            userToSave.setLogin(user.getLogin());
            userToSave.setEmail(user.getEmail());
            userToSave.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(userToSave);
            if (savedUser != null) {
                savedUser.renewSessionID();
                userRepository.save(savedUser);
                return new ResponseEntity<>(
                        savedUser,
                        sessionIdentifierManager.getHeaderWithSessionIDCookie(savedUser.getSessionID()),
                        HttpStatus.OK
                );
            } else {
                return new ResponseEntity<>("Couldn't save",HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>("Password don't match", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping(path="/all")
    public @ResponseBody ResponseEntity<Iterable<User>> getAllUsers(@CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        return new ResponseEntity<>(
                userRepository.findAll(),
                sessionIdentifierManager.getHeaderWithSessionIDCookie(sessionIDCookie),
                HttpStatus.OK
        );
    }

    @PostMapping(path="/login")
    public @ResponseBody
    ResponseEntity login(@ModelAttribute User user) throws Exception {
        User userToLog = userRepository.findByEmail(user.getEmail());
        passwordEncoder = new BCryptPasswordEncoder();
        if (userToLog == null || !passwordEncoder.matches(user.getPassword(), userToLog.getPassword())) {
            return new ResponseEntity<>("Couldn't log you in", HttpStatus.UNAUTHORIZED);
        }
        userToLog.renewSessionID();
        User savedUser = userRepository.save(userToLog);
        if (savedUser == null) {
            return new ResponseEntity<>("Couldn't save session id", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(
                userToLog,
                sessionIdentifierManager.getHeaderWithSessionIDCookie(userToLog.getSessionID()),
                HttpStatus.OK
        );
    }

    @GetMapping(path="/me")
    public @ResponseBody
    ResponseEntity me(@CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        User loggedUser = userRepository.findBySessionID(sessionIDCookie);
        if (loggedUser != null) {
            return new ResponseEntity<>(
                    loggedUser,
                    sessionIdentifierManager.getHeaderWithSessionIDCookie(
                            loggedUser.getSessionID()
                    ),
                    HttpStatus.OK
            );
        }
        return new ResponseEntity<>(new User(), HttpStatus.OK);
    }

    @GetMapping(path = "/logout")
    public @ResponseBody ResponseEntity logout() throws Exception {
        return new ResponseEntity<>(
                new User(),
                sessionIdentifierManager.getHeaderWithSessionIDCookie("0"),
                HttpStatus.OK
        );
    }
}
