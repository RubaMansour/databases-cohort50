function getPopulation(Country, name, code, cb) {
  
  const query = `SELECT Population FROM ?? WHERE Name = ? and code = ?`;
  const values = [Country, name, code];

  conn.query(query, values, (err, result) => {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population);
  });
}
