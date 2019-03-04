module.exports = (sequelize,Datatypes) =>
    sequelize.define('DriverWaypoints' , {
        sequence: Datatypes.INTEGER,
        location: Datatypes.STRING,
        mins: Datatypes.INTEGER     // how long in mins it takes to get there

    })
// relationships defined in index!!