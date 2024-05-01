package streams.entities;

public class PersonDTO {
  public String name;
  public Integer age;

  public PersonDTO(String name, Integer age) {
    this.name = name;
    this.age = age;
  }

  public static PersonDTO map(Person person) {
    return new PersonDTO(person.name, person.age);
  }

  @Override
  public String toString() {
    return "PersonDTO { name: " + name + ", age: " + age + " }";
  }
}
