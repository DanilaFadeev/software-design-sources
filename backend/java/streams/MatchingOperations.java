package streams;

import java.util.List;

import org.junit.Test;

import streams.data.MockData;
import streams.entities.Person;

public class MatchingOperations {

  private final List<Person> persons = MockData.getPersons();
  private final List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

  @Test()
  public void getFilteredPersons() {
    List<Person> matchedPersons = persons.stream()
      .filter(person -> person.age > 20 && person.age < 25)
      .toList();

    // Person: { name: Alison Reichert, age: 21, weight: 105.7 }
    // Person: { name: Demetrius Corkery, age: 22, weight: 97.1 }
    // Person: { name: Enoch Lynch, age: 21, weight: 100.3 }
    // ...
    matchedPersons.forEach(person -> System.out.println(person));
  }

  @Test()
  public void getMatchedNumberSequence() {
    List<Integer> matchedNumbers = numbers.stream()
      .takeWhile(num -> num < 5).toList();

    // Matched Numbers: [1, 2, 3, 4]
    System.out.println("Matched Numbers: " + matchedNumbers);
  }

  @Test()
  public void getUnmatchedNumberSequence() {
    List<Integer> matchedNumbers = numbers.stream()
      .dropWhile(num -> num < 5).toList();

    // Matched Numbers: [5, 6, 7, 8, 9, 10]
    System.out.println("Matched Numbers: " + matchedNumbers);
  }

  @Test()
  public void getFirstFoundPerson() {
    Person matchedPerson = persons.stream()
      .filter(person -> person.age < 25)
      .findFirst()
      .orElse(null);

    // Matched Person: Person: { name: Alison Reichert, age: 21, weight: 105.7 }
    System.out.println("Matched Person: " + matchedPerson);
  }

  @Test()
  public void getAnyFoundPerson() {
    Person matchedPerson = persons.stream()
      .filter(person -> person.age > 25)
      .findAny()
      .orElse(null);

    // Matched Person: Person: { name: Terry Medhurst, age: 50, weight: 75.4 }
    System.out.println("Matched Person: " + matchedPerson);
  }

  @Test()
  public void hasAllEvenNumbers() {
    boolean hasAllEvenNumbers = numbers.stream().allMatch(num -> num % 2 == 0);

    // Has all even numbers: false
    System.out.println("Has all even numbers: " + hasAllEvenNumbers);
  }

  @Test()
  public void hasAnyEvenNumbers() {
    boolean hasAnyEvenNumber = numbers.stream().anyMatch(num -> num % 2 == 0);

    // Has any even number: true
    System.out.println("Has any even number: " + hasAnyEvenNumber);
  }
}
