package ninja.breizhlink.utils;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.math.BigInteger;

public final class SessionIdentifierGenerator {
    private SecureRandom random = new SecureRandom();

    public static HttpSession session() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession(true);
    }

    public String nextSessionId() {
        return new BigInteger(130, random).toString(32);
    }
}
