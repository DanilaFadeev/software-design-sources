class MySQLConnection {
  public connect() {
    // Connecting to the MySQL database server
  }

  public query(_query: string) {
    // Run SQL query on the connected MySQL database
  }
}

class TaskManager {
  constructor(private mySqlConnection: MySQLConnection) {
    mySqlConnection.connect();
  }

  public showTasks(): void {
    const query = 'SELECT * FROM tasks';
    const tasks = this.mySqlConnection.query(query);

    console.table(tasks);
  }
}

const mySqlConnection = new MySQLConnection();
const taskManager = new TaskManager(mySqlConnection);
taskManager.showTasks();
