package streams;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.junit.Test;

import streams.data.MockData;
import streams.entities.Person;

public class StreamInitialization {

  @Test()
  public void getStreamFromCollection() {
    List<String> namesList = List.of("Terry", "Sheldon", "Terrill", "Miles", "Mavis");
    Stream<String> namesStream = namesList.stream();

    // Terry, Sheldon, Terrill, Miles, Mavis
    System.out.println(namesStream.collect(Collectors.joining(", ")));
  }

  @Test()
  public void getStreamFromItems() {
    Stream<String> namesStream = Stream.of("Terry", "Sheldon", "Terrill", "Miles", "Mavis");

    // Terry, Sheldon, Terrill, Miles, Mavis
    System.out.println(namesStream.collect(Collectors.joining(", ")));
  }

  @Test()
  public void getStreamFromArray() {
    String[] names = { "Terry", "Sheldon", "Terrill", "Miles", "Mavis" };
    Stream<String> namesStream = Arrays.stream(names);

    // Terry, Sheldon, Terrill, Miles, Mavis
    System.out.println(namesStream.collect(Collectors.joining(", ")));
  }

  @Test()
  public void getStreamFromIntStream() {
    IntStream numbers = IntStream.range(0, 10);

    // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    System.out.println(
      numbers.mapToObj(Integer::toString).collect(Collectors.joining(", "))
    );
  }

  @Test()
  public void streamsExecution() {
    List<Person> persons = MockData.getPersons();
    
    persons.stream()
      .filter(person -> {
        Boolean isMatched = person.age > 30;
        System.out.println(person + ", FILTER MATCH: " + isMatched);
        return isMatched;
      })
      .map(person -> {
        System.out.println("Extract age: " + person.age);
        return person.age;
      })
      .map(personAge -> {
        String ageStr = personAge + " y.o.";
        System.out.println("Convert to a string: " + ageStr);
        return ageStr;
      })
      .toList();

    // Person: { name: Terry Medhurst, age: 50, weight: 75.4 }, FILTER MATCH: true
    // Extract age: 50
    // Convert to a string: 50 y.o.
    // Person: { name: Sheldon Quigley, age: 28, weight: 74.0 }, FILTER MATCH: false
    // Person: { name: Terrill Hills, age: 38, weight: 105.3 }, FILTER MATCH: true
    // Extract age: 38
    // ...
  }
}
