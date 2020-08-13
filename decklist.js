var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// delete database
// fs.unlinkSync(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  db.run('CREATE TABLE IF NOT EXISTS Decklists (username TEXT, deck TEXT)');
});

const Decklist = {};

Decklist.add = function(username, deck, callback) {
  db.serialize(function() {
    db.run('DELETE FROM Decklists WHERE username = ?', username);
    db.run('INSERT INTO Decklists (username, deck) VALUES (?, ?)', username, deck, function(err) {
      callback(err);
    });
  });
};

Decklist.all = function(callback) {
  db.serialize(function() {
    db.all('SELECT * FROM Decklists', function(err, rows) {
      if (rows) return callback(null, rows);
      callback(err, []);
    });
  });
};

Decklist.delete = function(username, callback) {
  db.serialize(function() {
    db.run('DELETE FROM Decklists WHERE username = ?', username, function(err) {
      callback(err);
    });
  });
}

Decklist.reset = function(callback) {
  db.serialize(function() {
    db.run('DELETE FROM Decklists', function(err) {
      callback(err);
    });
  });
}

module.exports = Decklist;
