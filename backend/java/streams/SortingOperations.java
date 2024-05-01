package streams;

import java.util.Comparator;
import java.util.List;
import org.junit.Test;
import streams.data.MockData;
import streams.entities.Person;

public class SortingOperations {

  private final List<Person> persons = MockData.getPersons();
  private final List<Integer> numbers = List.of(2, 4, 6, 8, 1, 3, 5, 7 );

  @Test()
  public void sortNumbers() {
    List<Integer> sortedNumbers = numbers.stream().sorted().toList();

    // Sorted numbers: [1, 2, 3, 4, 5, 6, 7, 8]
    System.out.println("Sorted numbers: " + sortedNumbers);
  }

  @Test()
  public void sortNumbersReversed() {
    List<Integer> sortedNumbers = numbers.stream()
      .sorted(Comparator.reverseOrder())
      .toList();

    // Sorted numbers: [8, 7, 6, 5, 4, 3, 2, 1]
    System.out.println("Reverse-sorted numbers: " + sortedNumbers);
  }

  @Test()
  public void sortObjects() {
    Comparator<Person> comparator = Comparator.comparing(Person::getName);
    List<Person> sortedPersons = persons.stream().sorted(comparator).toList();

    // Sorted persons: Alison Reichert, Arely Skiles, Assunta Rath, ...
    System.out.print("Sorted persons: ");
    sortedPersons.forEach(person -> System.out.print(person.name + ", "));
  }

  @Test()
  public void sortObjectsReversed() {
    List<Person> sortedPersons = persons.stream()
      .sorted(
        Comparator
          .comparing(Person::getName)
          .reversed()
      )
      .toList();

    // Sorted persons: Trycia Fadel, Tressa Weber, Trace Douglas, ...
    System.out.print("Reverse-sorted persons: ");
    sortedPersons.forEach(person -> System.out.print(person.name + ", "));
  }
}
