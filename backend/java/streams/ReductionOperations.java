package streams;

import java.util.DoubleSummaryStatistics;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.junit.Test;

import streams.data.MockData;
import streams.entities.Person;

public class ReductionOperations {

  private final List<Person> persons = MockData.getPersons();
  private final List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

  @Test()
  public void getMinNumber() {
    int min1 = numbers.stream().min(Integer::compareTo).get();
    int min2 = numbers.stream().mapToInt(Integer::intValue).min().orElse(0);
    
    // Min #1: 1, Min #2: 1
    System.out.println("Min #1: " + min1 + ", Min #2: " + min2);
  } 

  @Test()
  public void getMaxNumber() {
    int max1 = numbers.stream().max(Integer::compareTo).get();
    int max2 = numbers.stream().mapToInt(Integer::intValue).max().orElse(0);
    
    // Max #1: 1, Max #2: 1
    System.out.println("Max #1: " + max1 + ", Max #2: " + max2);
  }

  @Test()
  public void getTotalWeight() {
    double totalWeight =  persons.stream()
      .mapToDouble(p -> p.weight)
      .reduce(0.0, (acc, weight) -> acc + weight);

    // Total weight: 2489.8999999999996
    System.out.println("Total weight: " + totalWeight);
  }

  @Test()
  public void getPersonsCountByAge() {
    long count = persons.stream().filter(p -> p.age == 21).count();

    // Persons count with age 21: 3
    System.out.println("Persons count with age 21: " + count);
  }

  @Test()
  public void getNumbersSum() {
    int numbersSum = numbers.stream().mapToInt(Integer::intValue).sum();

    // Numbers total sum: 55
    System.out.println("Numbers total sum: " + numbersSum);
  }

  @Test()
  public void getIntSummaryStatistics() {
    IntSummaryStatistics intStats = numbers.stream()
      .mapToInt(Integer::intValue)
      .summaryStatistics();

    System.out.println("Summary statistics for " + numbers + ":");
    System.out.println("Count: " + intStats.getCount()); // Count: 10
    System.out.println("Average: " + intStats.getAverage()); // Average: 5.5
    System.out.println("Min: " + intStats.getMin()); // Min: 1
    System.out.println("Max: " + intStats.getMax()); // Max: 10
    System.out.println("Sum: " + intStats.getSum()); // Sum: 55
  }

  @Test()
  public void getDoubleSummaryStatistics() {
    DoubleSummaryStatistics doubleStats = persons.stream()
      .mapToDouble(Person::getWeight)
      .summaryStatistics();

    System.out.println("Summary statistics for person weights:");
    System.out.println("Count: " + doubleStats.getCount()); // Count: 30
    System.out.println("Average: " + doubleStats.getAverage()); // Average: 82.996...
    System.out.println("Min: " + doubleStats.getMin()); // Min: 45.7
    System.out.println("Max: " + doubleStats.getMax()); // Max: 107.2
    System.out.println("Sum: " + doubleStats.getSum()); // Sum: 2489.9
  }

  @Test()
  public void groupPersonsByAge() {
    Map<Integer, List<Person>> personsByAge = persons.stream()
      .collect(Collectors.groupingBy(person -> person.age));

    // 38: Terrill Hills, Mavis Schultz,
    // 39: Marcel Jones
    // 41: Trycia Fadel, Lenna Renner, Tressa Weber
    // ...
    personsByAge.forEach((age, agePersons) -> {
      String personsList = agePersons.stream()
        .map(Person::getName)
        .collect(Collectors.joining(", "));

      System.out.println(age + ": " + personsList);
    });
  }

  @Test
  public void groupAgeByPersonsCount() {
    Map<Integer, Long> agesByCount = persons.stream()
      .collect(Collectors.groupingBy(Person::getAge, Collectors.counting()));

    // 38 y.o. -> 2 times
    // 39 y.o. -> 1 times
    // 41 y.o. -> 3 times
    agesByCount.forEach((age, count) -> System.out.println(age + " y.o. -> " + count + " times"));
  }

  @Test()
  public void joinStrings() {
    String personsList = persons.stream()
      .map(Person::getName)
      .collect(Collectors.joining(", "));

    // Persons: Terry Medhurst, Sheldon Quigley, Terrill Hills, ...
    System.out.println("Persons: " + personsList);
  }
}
