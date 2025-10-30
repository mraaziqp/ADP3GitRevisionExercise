package za.ac.cput.adp3gitrevisionexercise.JKProgram;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * @author Juan-Lee Klink 218236883
 * Tests
 *
 */

class JKHumanTest {

    private JKHuman person1;
    private JKHuman person2;

    @BeforeEach
    void setUp() {
        person1 = new JKHuman("James","Male","Pizza","South Park");
        person2 = new JKHuman("James", "Female", "Pizza", "Naruto");
    }

    @Test
    void testIdentity(){
        assertEquals(person1.getPersonName(), person2.getPersonName());
    }

    @Test
    void testEquality(){
        assertEquals(person1.getPersonFavFood(), person2.getPersonFavFood());
    }

    @Test
    void testDistinctPreferences(){
        assertNotEquals(person1.getPersonFavShow(), person2.getPersonFavShow());
    }

    @Test
    @Disabled
    void testDisableTest(){
        assertSame(person1.getPersonName(),person2.getPersonName());
    }

}