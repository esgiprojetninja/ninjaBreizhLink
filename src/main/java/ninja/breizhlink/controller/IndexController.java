package ninja.breizhlink.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
public class IndexController {
    @GetMapping(path = "/")
    public String index(@CookieValue(value = "user_id", defaultValue = "0") String userId) {
        return "index";
    }
}
