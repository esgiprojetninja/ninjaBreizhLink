package ninja.breizhlink.controller;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://breizh.link")
@RequestMapping(path="/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    @GetMapping(path="/add")
    public @ResponseBody String addNewUser(@RequestParam String login, @RequestParam String email) {
        User user = new User();
        user.setEmail(email);
        user.setLogin(login);
        userRepository.save(user);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        System.out.println("==== in get all ====");
        return userRepository.findAll();
    }
}
