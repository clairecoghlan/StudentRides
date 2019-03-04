module.exports = (sequelize,Datatypes) =>
    sequelize.define('PassTrips' , {
        // week: Datatypes.INTEGER, // week number
        // dow: cday of week
        weekNo: Datatypes.STRING,   // specify the week number
        location: Datatypes.STRING,  // pickup location - change this to FK into Locations
        leg: Datatypes.INTEGER, // outbound = 1 , return = 2
        dep: Datatypes.TIME, // when they will be picked up
        arr: Datatypes.TIME,    // when they will arrive
        // status:Datatypes.INTEGER // pointer to  DriverTripStatus
        // driver: Datatypes.INTEGER,   // the driver for this leg
        // driverLeg : Datatypes.INTEGER    // might be better to link to the DriverTrip id
    })