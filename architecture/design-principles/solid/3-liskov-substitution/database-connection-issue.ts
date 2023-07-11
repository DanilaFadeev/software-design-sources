class DatabaseConnection {
  constructor(protected connectionUri: string) {}

  public connect(): void {
    console.log(`Connecting to the ${this.connectionUri} DB`);
  }

  public query(query: string): void {
    console.log(`Fetch data with "${query}" query`);
  }
}

class PostgreSQLConnection extends DatabaseConnection {
  public connect(): void {
    console.log(`Connecting to the PostgreSQL`);
  }

  public query(query: string): void {
    console.log(`Fetch PostgreSQL data with "${query}" query`);
  }
}

class MongoDBConnection extends DatabaseConnection {
  public connect(): void {
    console.log(`Connecting to the MongoDB`);
  }

  public query(_query: string): void {
    throw new Error(`String query is not supported on MongoDB`)
  }

  public collectionQuery(query: object): void {
    console.log(`Fetch MongoDB data with ${JSON.stringify(query)} query`);
  }
}
