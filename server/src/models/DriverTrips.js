module.exports = (sequelize,Datatypes) =>
    sequelize.define('DriverTrips' , {
        weekNo: Datatypes.STRING,   // specify the week number
        // dow: Datatypes.INTEGER, // day of week
        leg: Datatypes.INTEGER, // outbound = 1 , return = 2
        dep: Datatypes.TIME, // how long in mins it takes to get there
        arr: Datatypes.TIME,
        // status:Datatypes.INTEGER // pointer to  DriverTripStatus
    })