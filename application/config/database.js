module.exports = {
    HOST: "localhost",
    USER: "tryloop",
    PASSWORD: "Tryloop007123",
    DB: "tryloopdb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}