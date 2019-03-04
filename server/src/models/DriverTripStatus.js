module.exports = (sequelize,Datatypes) =>
    sequelize.define('DriverTripStatus' , {
        status: Datatypes.STRING,   // status message
        code: Datatypes.STRING     // short code

    })