import { openDB } from 'idb';
let m_store;
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      m_store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    
  var dbProm = initdb();
  dbProm.then(function(db){
    var trans = db.transaction('jate', 'readwrite');
    var store = trans.objectStore('jate');
    store.add(content);
    return trans.complete;
  });
    
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  var dbProm = initdb();
  dbProm.then(function(db){
    var trans = db.transaction('jate', 'readwrite');
    var store = trans.objectStore('jate');
    return store.getAll();
  });
}

initdb();
