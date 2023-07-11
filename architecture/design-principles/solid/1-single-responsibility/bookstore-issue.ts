import * as fs from 'node:fs';

/**
 * Book class contains information about a concrete book.
 * 
 * All is fine, according to the Single Responsibility principle:
 * we have to change the class only if the data schema is changed.
 */
class Book {
  constructor(
    public title: string,
    public author: string,
    public price: number
  ) {}
}

/**
 * Invoice class is responsible for the total price calculation,
 * but at the same time, it prints the invoices and saves them.
 * 
 * It means that the Invoice class must be changed in a few cases:
 *  - the total price calculation logic is changed
 *  - printing output/format is changed
 *  - data save storage is changed
 */
class Invoice {
  private total: number;

  constructor(
    public book: Book,
    public quantity: number
  ) {
    this.total = this.calculateTotalPrice();
  }

  public calculateTotalPrice(): number {
    return this.book.price * this.quantity;
  }

  public print(): void {
    const { title, author } = this.book;
    console.log(`Book "${title}" (${author}) x ${this.quantity}: ${this.total}`);
  }

  public save(): void {
    const data = {
      item: `${this.book.title}. ${this.book.author}`,
      quantity: this.quantity,
      total: this.total
    };
    fs.writeFileSync('invoice.json', JSON.stringify(data));
  }
}

/**
 * Demonstration
 */
const book = new Book('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 19.99);
const invoice = new Invoice(book, 3);

invoice.print();
invoice.save();
