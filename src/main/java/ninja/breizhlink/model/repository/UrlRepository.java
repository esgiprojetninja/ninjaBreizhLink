package ninja.breizhlink.model.repository;

import ninja.breizhlink.model.Url;
import org.springframework.data.repository.CrudRepository;

public interface UrlRepository extends CrudRepository<Url, Long> {
    Url findByShortUrl(String shortUrl);
}
