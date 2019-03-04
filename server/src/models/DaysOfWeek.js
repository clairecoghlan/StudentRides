module.exports = (sequelize,Datatypes) =>
    sequelize.define('DaysOfWeek' , {
        day: Datatypes.STRING,
    })