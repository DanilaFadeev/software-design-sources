package streams.entities;

public class Person {
  public String name;
  public Integer age;
  public Double weight;

  public Person(String name, Integer age, Double weight) {
    this.name = name;
    this.age = age;
    this.weight = weight;
  }

  public String getName() {
    return this.name;
  }

  public Integer getAge() {
    return this.age;
  }

  public Double getWeight() {
    return this.weight;
  }

  @Override
  public String toString() {
    return "Person: { name: " + name + ", age: " + age + ", weight: " + weight + " }";
  }
}
