import * as fs from 'node:fs';
import { Invoice } from '../01-single-responsibility/bookstore-solution';

interface InvoicePersistence {
  save(invoice: Invoice): void;
}

class FileInvoicePersistence implements InvoicePersistence {
  public save(invoice: Invoice): void {
    const data = {
      item: `${invoice.book.title}. ${invoice.book.author}`,
      quantity: invoice.quantity,
      total: invoice.total
    };
    fs.writeFileSync('invoice.json', JSON.stringify(data));
  }
}

class DatabaseInvoicePersistence implements InvoicePersistence {
  public save(invoice: Invoice): void {
    // Some logic to make a DB insert query goes here
  }
}
