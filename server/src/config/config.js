module.exports = {
    port : 3000,
    db: {
        database: process.env.DB_NAME || 'carshare',
        user: process.env.DB_USER || 'carshare',
        password: process.env.DB_PASSWORD || 'carshare',
        options: {
            dialect: process.env.DIALECT || 'sqlite',    // allow connect to other db
            host: process.env.HOST || 'localhost',    // server where database is located
            storage: './careshare.sqlite',       // where store sqlite data

        }
    }
}