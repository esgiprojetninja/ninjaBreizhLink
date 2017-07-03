package ninja.breizhlink.controller;

import ninja.breizhlink.model.Url;
import ninja.breizhlink.model.repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Controller
@CrossOrigin(origins = "http://breizh.link")
@RequestMapping(path="/url")
public class UrlController {
    @Autowired
    private UrlRepository urlRepository;

    @GetMapping(path="/add")
    public @ResponseBody String addNewUrl(@RequestParam String longUrl) {
        Url url = new Url();
        url.setLongUrl(longUrl);
        Url savedUrl = urlRepository.save(url);
        savedUrl.setShortUrl(this.createShortUrl(savedUrl.getId()));
        return urlRepository.save(savedUrl).toString();
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Url> getAllUrl() {
        System.out.println("=== in get all Urls ===");
        return urlRepository.findAll();
    }

     private String createShortUrl(int id) {
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
