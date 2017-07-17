package ninja.breizhlink.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
public class IndexController {
    @GetMapping(path = "/")
    public String index() {
        return "index";
    }
}
