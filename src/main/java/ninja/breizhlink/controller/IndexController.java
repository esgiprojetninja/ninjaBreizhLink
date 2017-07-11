package ninja.breizhlink.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Controller
@CrossOrigin(origins = "http://breizh.link")
public class IndexController {
    @GetMapping(path = "/")
    public String index(HttpServletResponse res) {
        Cookie cookie = new Cookie("user_id", "prout");
        res.addCookie(cookie);
        System.out.println(cookie.getValue());
        return "index";
    }
}
