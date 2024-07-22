// https://gist.github.com/JamesMessinger/a0d6389a5d0e3a24814b

import data from './results.json' with { type: 'json' };
export const boampData = data;

// This works on all devices/browsers, and uses IndexedDBShim as a final fallback
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

// Open (or create) the database
const open = indexedDB.open('boamp-db', 1);

// Create the schema
open.onupgradeneeded = () => {
  const db = open.result;
  const store = db.createObjectStore('avis', { keyPath: 'idweb' });
  store.createIndex('IdwebIndex', ['idweb']);
};

open.onsuccess = () => {
  // Start a new transaction
  const db = open.result;
  const tx = db.transaction('avis', 'readwrite');
  const store = tx.objectStore('avis');
  const indexIdweb = store.index('IdwebIndex');

  // Add some data
  console.time('doSomething');
  data.forEach((item) => {
    store.put(item);
  });
  console.timeEnd('doSomething');

  // Query the data
  const getFirst = indexIdweb.get(['24-76932']);
  const getSecond = indexIdweb.get(['24-76638']);

  getFirst.onsuccess = () => {
    // console.log(getFirst.result);
  };

  getSecond.onsuccess = () => {
    // console.log(getSecond.result);
  };

  // Close the db when the transaction is done
  tx.oncomplete = () => {
    db.close();
  };
};
