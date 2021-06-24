module.exports = {
    HOST: "localhost",
    USER: "anomrace",
    PASSWORD: "anomrace",
    DB: "test",
    dialect: "mysql",
    port: 8889,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };