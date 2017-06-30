package ninja.breizhlink.model;

import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.Test;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class UserTest {
    private static final String PERISTENCE_UNIT_NAME = "breizhlink";
    private EntityManagerFactory factory;
    User user;

    @Before
    public void setUp() throws Exception {
        factory = Persistence.createEntityManagerFactory(PERISTENCE_UNIT_NAME);
        user = new User();
    }

    @Test
    public void testModel() {
        user.setEmail("toto@tata.to");
        assertTrue(user.getEmail().compareTo("toto@tata.to") == 0);
    }
}
