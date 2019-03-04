module.exports = (sequelize,Datatypes) =>
    sequelize.define('Dow' , {
        day: Datatypes.STRING,
    })