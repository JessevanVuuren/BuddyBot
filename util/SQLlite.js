import * as SQLite from "expo-sqlite"

const database = SQLite.openDatabase("buddy.db")



export const initDatabase = async () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS buddy (
          id INTEGER PRIMARY KEY,
          name TEXT,
          DOB TEXT,
          URI TEXT
      )`, [], () => resolve(), (_, error) => reject(error));

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS wishlist (
          id INTEGER PRIMARY KEY,
          buddyId INT,
          wish TEXT,
          FOREIGN KEY(buddyId) REFERENCES buddy(id)
      )`, [], () => resolve(), (_, error) => reject(error));
    })
  })

  

  return promise
}



export const saveNewBuddy = async ({ name, DOB, URI }) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO buddy (name, DOB, URI) VALUES (?, ?, ?)`,
        [name, DOB, URI],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise;
}

export const fetchAllBuddys = async () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM buddy',
        [],
        (_, result) => {
          const buddys = [];
          for (const DB of result.rows._array) {
            buddys.push({ id: DB.id, name: DB.name, DOB: DB.DOB, URI: DB.URI });
          }
          resolve(buddys);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const fetchSingleBuddy = async (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM buddy WHERE id = ?',
        [id],
        (_, result) => {
          const DB = result.rows._array[0]
          resolve({ id: DB.id, name: DB.name, DOB: DB.DOB, URI: DB.URI });
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const removeBuddy = async (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM buddy WHERE id = ?',
        [id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const updateBuddy = async (id, { name, DOB, URI }) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE buddy SET name = ?, DOB = ?, URI = ? WHERE id = ?',
        [name, DOB, URI, id],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise
}



export const getWishlist = async (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM wishlist WHERE buddyId = ?',
        [id],
        (_, result) => {
          const wishlist = [];
          for (const DB of result.rows._array) {
            wishlist.push({ id: DB.id, wish: DB.wish });
          }
          resolve(wishlist);
        },
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const updateWishlistItem = async (wishID, newWish) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'UPDATE wishlist SET wish = ? WHERE id = ?',
        [newWish, wishID],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const deleteWishlistItem = async (wishID) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM wishlist WHERE id = ?',
        [wishID],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise
}

export const addNewWishlistItem = async (id, wish) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO wishlist (buddyId, wish) VALUES (?, ?)',
        [id, wish],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });

  return promise
}