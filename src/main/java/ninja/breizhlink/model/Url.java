package ninja.breizhlink.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Type;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Url {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private String longUrl = "";
    private String shortUrl = "";
    private String password = "";
    private Boolean usePwd = false;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;
    private Boolean useDate = false;
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime fromDateTime;
    @Type(type="org.jadira.usertype.dateandtime.joda.PersistentDateTime")
    private DateTime toDateTime;

    public Url() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLongUrl() {
        return longUrl;
    }

    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }

    public String getShortUrl() {
        return shortUrl;
    }

    public void setShortUrl(String shortUrl) {
        this.shortUrl = shortUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getUsePwd() {
        return usePwd;
    }

    public void setUsePwd(Boolean usePwd) {
        this.usePwd = usePwd;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public DateTime getFromDateTime() {
        return fromDateTime;
    }

    public void setFromDateTime(DateTime fromDateTime) {
        this.fromDateTime = fromDateTime;
    }

    public DateTime getToDateTime() {
        return toDateTime;
    }

    public void setToDateTime(DateTime toDateTime) {
        this.toDateTime = toDateTime;
    }

    public Boolean getUseDate() {
        return useDate;
    }

    public void setUseDate(Boolean useDate) {
        this.useDate = useDate;
    }

    @Override
    public String toString() {
        return "Url{" +
                "id=" + id +
                ", longUrl='" + longUrl + '\'' +
                ", shortUrl='" + shortUrl + '\'' +
                ", password='" + password + '\'' +
                ", usePwd=" + usePwd +
                ", user=" + user +
                ", useDate=" + useDate +
                ", fromDateTime=" + fromDateTime +
                ", toDateTime=" + toDateTime +
                '}';
    }
}
