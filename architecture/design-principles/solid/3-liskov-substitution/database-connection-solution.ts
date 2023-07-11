class DatabaseConnection {
  constructor(protected connectionUri: string) {}

  public connect(): void {
    console.log(`Connecting to the ${this.connectionUri} DB`);
  }
}

class RelationalDatabaseConnection extends DatabaseConnection {
  public query(query: string): void {
    console.log(`Fetch data with "${query}" query`);
  }
}

class NonrelationalDatabaseConnection extends DatabaseConnection {
  public collectionQuery(query: object): void {
    console.log(`Fetch data with ${JSON.stringify(query)} query`);
  }
}

class PostgreSQLConnection extends RelationalDatabaseConnection {
  // ...
}

class MongoDBConnection extends NonrelationalDatabaseConnection {
  // ..
}
