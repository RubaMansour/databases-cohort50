function getPopulation(Country, name, code, cb) {
  const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
  
  conn.query(query, [Country, name, code], function (err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length == 0) {
      cb(new Error("Not found"));
      return;
    }

    cb(null, result[0].Population);
  });
}
