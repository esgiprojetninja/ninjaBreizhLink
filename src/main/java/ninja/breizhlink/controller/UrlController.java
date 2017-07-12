package ninja.breizhlink.controller;

import ninja.breizhlink.model.Url;
import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UrlRepository;
import ninja.breizhlink.model.repository.UserRepository;
import ninja.breizhlink.utils.SessionIdentifierManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.Random;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
@RequestMapping(path="url")
public class UrlController {
    @Autowired
    private UrlRepository urlRepository;
    @Autowired
    private UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private SessionIdentifierManager sessionIdentifierManager;

    @PostMapping(path="/add")
    public @ResponseBody
    ResponseEntity addNewUrl(@ModelAttribute Url url, @CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        User user = userRepository.findBySessionID(sessionIDCookie);
        if (user != null) {
            url.setUser(user);
        }
        Url savedUrl = urlRepository.save(url);
        if (url.getUsePwd()) {
            passwordEncoder = new BCryptPasswordEncoder();
            savedUrl.setPassword(passwordEncoder.encode(url.getPassword()));
        }
        savedUrl.setShortUrl(this.createShortUrl(savedUrl.getId()));
        Url urlToReturn = urlRepository.save(savedUrl);
        if (urlToReturn != null) {
            return new ResponseEntity<>(
                    urlToReturn,
                    sessionIdentifierManager.getHeaderWithSessionIDCookie(sessionIDCookie),
                    HttpStatus.OK
            );
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody ResponseEntity<Iterable<Url>> getAllUrl(@CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        try {
            Iterable<Url> urls = urlRepository.findAll();
            return new ResponseEntity<>(
                    urls,
                    sessionIdentifierManager.getHeaderWithSessionIDCookie(sessionIDCookie),
                    HttpStatus.OK
            );
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @RequestMapping("/{shortUrl}")
    public String handleRedirect(@PathVariable String shortUrl) {
        Url url = urlRepository.findByShortUrl(shortUrl);
        if (url.getUsePwd()) {
            return "redirect:/url/pwd/" + url.getId();
        }
        return "redirect:" + url.getLongUrl();
    }

    @GetMapping("/pwd/{id}")
    public String handleGetUrlPwd(@PathVariable Long id, Model model) {
        model.addAttribute("url_id", id);
        return "redirect_w_pwd";
    }

    @PostMapping("/pwd")
    public String handlePostUrlPwd(@RequestParam("password") String password, @RequestParam("url_id") Long id) {
        Url url = urlRepository.findOne(id);
        passwordEncoder = new BCryptPasswordEncoder();
        if(passwordEncoder.matches(password, url.getPassword())) {
            return "redirect:" + url.getLongUrl();
        }
        return "redirect:/url/pwd/" + url.getId();
    }

    @GetMapping("/my-urls")
    public @ResponseBody
    ResponseEntity getMyUrls(@CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie) throws Exception {
        User user = userRepository.findBySessionID(sessionIDCookie);
        if (user == null) {
            return new ResponseEntity<>(
                    "You are not logged in !",
                    sessionIdentifierManager.getHeaderWithSessionIDCookie("0"),
                    HttpStatus.FORBIDDEN
            );
        }
        return new ResponseEntity<>(
                user.getUrls(),
                sessionIdentifierManager.getHeaderWithSessionIDCookie(user.getSessionID()),
                HttpStatus.OK
        );
    }

     private String createShortUrl(Long id) {
        char[] chars = "abcdefghijklmnopqrstuvwxyz".toCharArray();
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        sb.append(id);
        for (int i = 0; i < 7; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        return sb.toString();
    }
}
