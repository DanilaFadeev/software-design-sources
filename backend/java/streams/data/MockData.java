package streams.data;

import java.util.List;
import streams.entities.Person;

public class MockData {
  public static List<Person> getPersons() {
    List<Person> persons = List.of(
        new Person("Terry Medhurst", 50, 75.4),
        new Person("Sheldon Quigley", 28, 74.0),
        new Person("Terrill Hills", 38, 105.3),
        new Person("Miles Cummerata", 49, 95.9),
        new Person("Mavis Schultz", 38, 106.3),
        new Person("Alison Reichert", 21, 105.7),
        new Person("Oleta Abbott", 31, 78.1),
        new Person("Ewell Mueller", 29, 52.1),
        new Person("Demetrius Corkery", 22, 97.1),
        new Person("Eleanora Price", 37, 48.0),
        new Person("Marcel Jones", 39, 63.7),
        new Person("Assunta Rath", 42, 96.8),
        new Person("Trace Douglas", 26, 56.5),
        new Person("Enoch Lynch", 21, 100.3),
        new Person("Jeanne Halvorson", 26, 45.7),
        new Person("Trycia Fadel", 41, 87.2),
        new Person("Bradford Prohaska", 43, 94.3),
        new Person("Arely Skiles", 42, 97.0),
        new Person("Gust Purdy", 46, 65.3),
        new Person("Lenna Renner", 41, 68.0),
        new Person("Doyle Ernser", 23, 69.9),
        new Person("Tressa Weber", 41, 87.1),
        new Person("Felicity O'Reilly", 46, 96.7),
        new Person("Jocelyn Schuster", 19, 93.3),
        new Person("Edwina Ernser", 21, 102.1),
        new Person("Griffin Braun", 35, 65.5),
        new Person("Piper Schowalter", 47, 71.5),
        new Person("Kody Terry", 28, 90.2),
        new Person("Macy Greenfelder", 45, 93.7),
        new Person("Maurine Stracke", 31, 107.2)
    );

    return persons;
  }
}
