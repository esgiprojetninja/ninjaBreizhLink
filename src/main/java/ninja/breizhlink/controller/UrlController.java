package ninja.breizhlink.controller;

import ninja.breizhlink.model.Url;
import ninja.breizhlink.model.UrlVisit;
import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UrlRepository;
import ninja.breizhlink.model.repository.UrlVisitRepository;
import ninja.breizhlink.model.repository.UserRepository;
import ninja.breizhlink.utils.SessionIdentifierManager;
import ninja.breizhlink.utils.VerifyRecaptcha;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;

import java.io.IOException;
import java.util.Date;
import java.util.Random;

@Controller
@CrossOrigin(origins = "http://b.li:8080")
@RequestMapping(path="url") // Mapp toutes les requètes commençant par "url"
public class UrlController {
    @Autowired
    private UrlRepository urlRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UrlVisitRepository urlVisitRepository;
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private SessionIdentifierManager sessionIdentifierManager;

    @PostMapping(path="/add") // Map les requètes POST sur /url/add
    public @ResponseBody
    ResponseEntity addNewUrl(
            @RequestParam String password,
            @RequestParam String longUrl,
            @RequestParam String td,
            @RequestParam String fd,
            @RequestParam int usePwd,
            @RequestParam int useDate,
            @RequestParam int useReCAPTCHA,
            @RequestParam int limitVisits,
            @RequestParam int maxVisits,
            @CookieValue(value = "session_id", defaultValue = "0") String sessionIDCookie
    ) throws Exception {
        Url url = new Url();
        User user = userRepository.findBySessionID(sessionIDCookie);
        if (user != null) {
            url.setUser(user);
        } else if ((useDate != 0 || useReCAPTCHA != 0 || limitVisits != 0)) {
            return new ResponseEntity<>(
                    "You are not logged in !",
                    HttpStatus.UNAUTHORIZED
            );
        }
        url.setLongUrl(longUrl);
        DateTimeFormatter dtf = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm");
        url.setFromDateTime(dtf.parseDateTime(fd));
        url.setToDateTime(dtf.parseDateTime(td));
        url.setUsePwd(usePwd != 0);
        url.setUseDate(useDate != 0);
        url.setUseReCAPTCHA(useReCAPTCHA != 0);
        url.setLimitVisits(limitVisits != 0);
        url.setMaxVisits(maxVisits);
        Url savedUrl = urlRepository.save(url);
        if (url.getUsePwd()) {
            passwordEncoder = new BCryptPasswordEncoder();
            savedUrl.setPassword(passwordEncoder.encode(password));
        }
        savedUrl.setShortUrl(this.createShortUrl(savedUrl.getId()));
        Url urlToReturn = urlRepository.save(savedUrl);
        if (urlToReturn != null) {
            return new ResponseEntity<>(
                    urlToReturn.getShortUrl(),
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
    public String handleRedirect(@PathVariable String shortUrl, Model model) {
        Url url = urlRepository.findByShortUrl(shortUrl);
        if (url == null) {
            return "url_not_found";
        }
        if(url.getLimitVisits()) {
            if (urlVisitRepository.countUrlVisit(url) >= url.getMaxVisits()) {
                return "url_reached_max_visit";
            }
        }
        if (url.getUseDate()) {
            if(url.getToDateTime().isBeforeNow()) {
                return "url_no_longer_available";
            } else if (url.getFromDateTime().isAfterNow()) {
                model.addAttribute("date", url.getFromDateTime().toDateTime());
                return "url_not_available_yet";
            }
        }
        if (url.getUseReCAPTCHA() || url.getUsePwd()) {
            return "redirect:/url/pwd/" + url.getId();
        }
        this.incrementVisitCounter(url);
        return "redirect:" + url.getLongUrl();
    }

    @GetMapping("/pwd/{id}")
    public String handleGetUrlPwd(@PathVariable Long id, Model model) {
        Url url = urlRepository.findOne(id);
        if(url.getUseReCAPTCHA()) {
            model.addAttribute("use_captcha", true);
        }
        if(url.getUsePwd()) {
            model.addAttribute("use_pwd", true);
        }
        model.addAttribute("url_id", id);
        return "redirect_w_pwd";
    }

    @PostMapping("/pwd")
    public String handlePostUrlPwd(
            @RequestParam(value = "password", required = false, defaultValue = "") String password,
            @RequestParam(value = "g-recaptcha-response", required = false) String gRecaptchaResponse,
            @RequestParam("url_id") Long id
    ) throws IOException {
        Url url = urlRepository.findOne(id);
        Boolean pwdOk = true;
        Boolean captchaOk = true;
        if (url.getUsePwd()) {
            pwdOk = false;
            passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(password, url.getPassword())) {
                pwdOk = true;
            }
        }
        if (url.getUseReCAPTCHA()) {
            System.out.println(gRecaptchaResponse);
            captchaOk = VerifyRecaptcha.verify(gRecaptchaResponse);
        }
        if (pwdOk && captchaOk) {
            this.incrementVisitCounter(url);
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
        for (int i = 0; i < 3; i++) {
            char c = chars[random.nextInt(chars.length)];
            sb.append(c);
        }
        return sb.toString();
    }

    private void incrementVisitCounter(Url url) {
        UrlVisit uv = new UrlVisit();
        uv.setUrl(url);
        uv.setDate(new Date());
        urlVisitRepository.save(uv);
        int count = urlVisitRepository.countUrlVisit(url);
    }
}
