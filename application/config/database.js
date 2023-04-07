module.exports = {
    HOST: "tryloopdb.cmdbwyxtxrrg.me-south-1.rds.amazonaws.com",
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