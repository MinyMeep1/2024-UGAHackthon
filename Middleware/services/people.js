const db = require('./db');
const helper = require('../helper');

async function getAll(){
  const rows = await db.query(
    `SELECT ID, Name, Description, PosterLink, ImgUrl FROM People`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  }
}

async function create(people){
  const result = await db.query(
    `INSERT INTO People 
    (Name, State, Description, PosterLink, ImgUrl) 
    VALUES 
    ('${people.Name}', '${people.State}', '${people.Description}', '${people.PosterLink}', '${people.ImgUrl}')`
  );

  let message = 'Error in creating person';

  if (result.affectedRows) {
    message = 'Person added successfully';
  }

  return {message};
}

async function search(ID){
  const row = await db.query(
    `SELECT * FROM people WHERE ID = ${ID}`
    );
  const data = helper.emptyOrRows(row);
  return {
    data
  }
}


module.exports = {
  getAll,
  create,
  search
}
