module.exports = (sequelize,Datatypes) =>
    sequelize.define('Weeks' , {
        start: Datatypes.DATE, // how long in mins it takes to get there
        finished: Datatypes.BOOLEAN
    })