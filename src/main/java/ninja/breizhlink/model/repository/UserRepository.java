package ninja.breizhlink.model.repository;


import ninja.breizhlink.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}