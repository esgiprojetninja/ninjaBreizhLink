package ninja.breizhlink.model.repository;

import ninja.breizhlink.model.Url;
import ninja.breizhlink.model.UrlVisit;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UrlVisitRepository extends CrudRepository<UrlVisit, Long> {
    @Query("SELECT COUNT(uv) FROM UrlVisit uv WHERE uv.url=:url")
    int countUrlVisit(@Param("url") Url url);
}
