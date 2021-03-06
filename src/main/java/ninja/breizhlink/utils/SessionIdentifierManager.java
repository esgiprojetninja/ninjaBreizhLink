package ninja.breizhlink.utils;

import ninja.breizhlink.model.User;
import ninja.breizhlink.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class SessionIdentifierManager {
    @Autowired
    private UserRepository userRepository;

    public HttpHeaders getHeaderWithSessionIDCookie(String token) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        try {
            if(token.compareTo("0") == 0) {
                headers.add("Set-Cookie","session_id=0;path=/;HttpOnly");
                return headers;
            }
            User user = userRepository.findBySessionID(token);
            if (user == null) {
                headers.add("Set-Cookie","session_id=0;path=/;HttpOnly");
                return headers;
            }
            user.renewSessionID();
            userRepository.save(user);
            headers.add("Set-Cookie","session_id=" + user.getSessionID() + ";path=/;HttpOnly");
            return  headers;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }
}
