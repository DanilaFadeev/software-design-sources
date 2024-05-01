package streams;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.junit.Test;

import streams.data.MockData;
import streams.entities.Person;
import streams.entities.PersonDTO;

public class MappingOperations {

  private final List<Person> persons = MockData.getPersons();

  @Test()
  public void mapToAnotherObject() {
    List<PersonDTO> personDTOs = persons.stream().map(PersonDTO::map).toList();

    // PersonDTO { name: Terry Medhurst, age: 50 }
    // PersonDTO { name: Sheldon Quigley, age: 28 }
    // ...
    personDTOs.forEach(personDTO -> System.out.println(personDTO));
  }

  @Test() 
  public void mapToNumber() {
    int[] ages = persons.stream().mapToInt(p -> p.age).toArray();
    long[] agesLong = persons.stream().mapToLong(p -> p.age).toArray();
    double[] weights = persons.stream().mapToDouble(p -> p.weight).toArray();

    // Ages: [50, 28, 38, 49, 38, 21, 31, 29, ...]
    System.out.println("Ages (Int): " + Arrays.toString(ages));

    // Ages (Long): [50, 28, 38, 49, 38, 21, 31, 29, ...]
    System.out.println("Ages (Long): " + Arrays.toString(agesLong));

    // Weights (Integer): [75.4, 74.0, 105.3, 95.9, 106.3, 105.7, ...]
    System.out.println("Weights (Integer): " + Arrays.toString(weights));
  }

  @Test()
  public void getFlattenStrings() {
    List<List<String>> shelves = List.of(
      List.of("Shelf 1", "Shelf 2"),
      List.of("Shelf 3", "Shelf 4", "Shelf 5"),
      List.of("Shelf 6")
    );

    List<String> flattenShelves = shelves.stream().flatMap(List::stream).toList();

    // Flatten Shelves: [Shelf 1, Shelf 2, Shelf 3, Shelf 4, Shelf 5, Shelf 6]
    System.out.println("Flatten Shelves: " + flattenShelves);
  }

  @Test()
  public void getDistinctNumbersList() {
    List<Integer> uniqueAges = persons.stream()
      .limit(5)
      .map(Person::getAge)
      .distinct()
      .toList();

    // Unique ages: [50, 28, 38, 49]
    System.out.println("Unique ages: " + uniqueAges);
  }

  @Test()
  public void getDistinctNumbersSet() {
    Set<Integer> agesSet = persons.stream()
      .limit(5)
      .map(Person::getAge)
      .collect(Collectors.toSet());

    // Set of ages: [49, 50, 38, 28]
    System.out.println("Set of ages: " + agesSet);
  }
}
