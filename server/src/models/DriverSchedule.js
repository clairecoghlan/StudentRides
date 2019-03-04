module.exports = (sequelize,Datatypes) =>
    sequelize.define('DriverSchedule' , {
        isActive: Datatypes.BOOLEAN,    // allow the driver to turn off
        // dow: Datatypes.INTEGER, // day of week
        leg: Datatypes.INTEGER, // outbound = 1 (Home -> UCC)  , return = 2 (UCC -> Home)
        dep: Datatypes.TIME, // how long in mins it takes to get there
        arr: Datatypes.TIME,
        capacity: Datatypes.INTEGER,    // reduce to 0

    })