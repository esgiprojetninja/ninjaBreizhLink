package ninja.breizhlink.controller;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import ninja.breizhlink.utils.SessionIdentifierGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;

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
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie","session_id=" + savedUser.getSessionID() + ";path=/;HttpOnly");
        return new ResponseEntity<>(userToLog,headers, HttpStatus.OK);
    }

    @GetMapping(path="/me")
    public @ResponseBody
    ResponseEntity me(@CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        User loggedUser = userRepository.findBySessionID(sessionIDCookie);
        if (loggedUser != null) {
            loggedUser.renewSessionID();
            return new ResponseEntity<>(loggedUser, getHeaderWithSessionIDCookie(loggedUser), HttpStatus.OK);
        }
        return new ResponseEntity<>(new User(), HttpStatus.OK);
    }

    @GetMapping(path = "/logout")
    public String logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("user_id", "0");
        response.addCookie(cookie);
        return "redirect:/";
    }

    private HttpHeaders getHeaderWithSessionIDCookie(User user) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        user.renewSessionID();
        try {
            userRepository.save(user);
            headers.add("Set-Cookie","session_id=" + user.getSessionID() + ";path=/;HttpOnly");
            return  headers;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
