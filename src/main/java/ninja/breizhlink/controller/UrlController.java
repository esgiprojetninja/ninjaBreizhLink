package ninja.breizhlink.controller;

import ninja.breizhlink.model.Url;
import ninja.breizhlink.model.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;

import java.util.Random;

@Controller
@CrossOrigin(origins = "http://breizh.link")
@RequestMapping(path="url")
public class UrlController {
    @Autowired
    private UrlRepository urlRepository;
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping(path="/add")
    public @ResponseBody String addNewUrl(@ModelAttribute Url url) {
        Url savedUrl = urlRepository.save(url);
        if (url.getPassword().compareTo("") != 0) {
            passwordEncoder = new BCryptPasswordEncoder();
            savedUrl.setPassword(passwordEncoder.encode(url.getPassword()));
        }
        savedUrl.setShortUrl(this.createShortUrl(savedUrl.getId()));
        return urlRepository.save(savedUrl).toString();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Url> getAllUrl() {
        return urlRepository.findAll();
    }

    @RequestMapping("/{shortUrl}")
    public String handleRedirect(@PathVariable String shortUrl) {
        Url url = urlRepository.findByShortUrl(shortUrl);
        if (url.getPassword() != null) {
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
