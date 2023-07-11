import * as fs from 'node:fs';
import { Invoice } from '../01-single-responsibility/bookstore-solution';

class InvoicePersistence {
  constructor(private invoice: Invoice) {}

  public saveToFile(): void {
    const data = {
      item: `${this.invoice.book.title}. ${this.invoice.book.author}`,
      quantity: this.invoice.quantity,
      total: this.invoice.total
    };
    fs.writeFileSync('invoice.json', JSON.stringify(data));
  }

  public saveToDatabase(): void {
    // Some logic to make a DB insert query goes here
  }
}