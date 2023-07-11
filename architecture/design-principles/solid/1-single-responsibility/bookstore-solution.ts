import * as fs from 'node:fs';

/**
 * Book class contains information about a concrete book.
 * We have to change the class only when the data schema is changed.
 */
export class Book {
  constructor(
    public title: string,
    public author: string,
    public price: number
  ) {}
}

/**
 * Invoice class is responsible for the total price calculation.
 * The class is changed only when we adjust the total price calculation algorithm.
 */
export class Invoice {
  public total: number;

  constructor(
    public book: Book,
    public quantity: number
  ) {
    this.total = this.calculateTotalPrice();
  }

  public calculateTotalPrice(): number {
    return this.book.price * this.quantity;
  }
}

/**
 * InvoicePrinter class is responsible for printing ready invoices.
 * It has to be changed only when we change the invoice print format.
 */
export class InvoicePrinter {
  constructor(private invoice: Invoice) {}

  public print(): void {
    const { quantity, total, book } = this.invoice;
    console.log(`Book "${book.title}" (${book.author}) x ${quantity}: ${total}`);
  }
}

/**
 * InvoicePersistence class is responsible for storing the ready invoices.
 * It has to be changed only when we change the way how we store the data.
 */
export class InvoicePersistence {
  constructor(private invoice: Invoice) {}

  public save(): void {
    const data = {
      item: `${this.invoice.book.title}. ${this.invoice.book.author}`,
      quantity: this.invoice.quantity,
      total: this.invoice.total
    };
    fs.writeFileSync('invoice.json', JSON.stringify(data));
  }
}


/**
 * Demonstration
 */
const book = new Book('Harry Potter and the Philosopher\'s Stone', 'J. K. Rowling', 19.99);
const invoice = new Invoice(book, 3);

new InvoicePrinter(invoice).print();
new InvoicePersistence(invoice).save();
