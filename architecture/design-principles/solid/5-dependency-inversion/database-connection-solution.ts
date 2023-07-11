interface DBConnection {
  connect(): void;
  query(query: string): void;
}

class TaskManager {
  constructor(private dbConnection: DBConnection) {
    dbConnection.connect();
  }

  public showTasks(): void {
    const query = 'SELECT * FROM tasks';
    const tasks = this.dbConnection.query(query);

    console.table(tasks);
  }
}

class MySQLConnection implements DBConnection {
  public connect() {
    // Connecting to the MySQL database server
  }

  public query(_query: string) {
    // Run SQL query on the connected MySQL database
  }
}

const connection = new MySQLConnection();
const taskManager = new TaskManager(connection);
taskManager.showTasks();
