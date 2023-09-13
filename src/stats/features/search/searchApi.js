import SQLite from 'react-native-sqlite-storage';

export const createTable = () => {
  const db = SQLite.openDatabase({name: 'search.db', location: 'default'});
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS search (id INTEGER PRIMARY KEY AUTOINCREMENT, keyword TEXT)',
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      (tx, error) => {
        console.log('Error occurred while creating the table:', error);
      },
    );
  });
};
export const InsertTable = ({name}) => {
  const db = SQLite.openDatabase({name: 'search.db', location: 'default'});
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO search (keyword) VALUES (?)',
      [name],
      (tx, results) => {
        console.log('Data inserted successfully');
      },
      (tx, error) => {
        console.log('Error occurred while inserting data:', error);
      },
    );
  });
};
export const DeleteRow = ({id}) => {
  const db = SQLite.openDatabase({name: 'search.db', location: 'default'});
  console.log(id);
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM search WHERE id = ?',
      [id],
      (tx, results) => {
        console.log('Data deleted successfully');
      },
      (tx, error) => {
        console.log('Error occurred while deleting data:', error);
      },
    );
  });
};
export const ReadTable = () => {
  const db = SQLite.openDatabase({name: 'search.db', location: 'default'});
  var data = [];
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM search',
      [],
      (tx, results) => {
        console.log('Data retrieved successfully');
        const len = results.rows.length;
        // data = results.rows;
        //   const len = results.rows.length;
        for (let i = 0; i < len; i++) {
          const row = results.rows.item(i);
          data.push(row);
        }
      },
      (tx, error) => {
        console.log('Error occurred while retrieving data:', error);
      },
    );
  });

  return data;
};
