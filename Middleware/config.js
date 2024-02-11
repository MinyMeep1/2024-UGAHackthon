const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "faces.mysql.database.azure.com",
      user: "waterbottle85",
      password: "Killer20045!",
      database: "faces",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;
  