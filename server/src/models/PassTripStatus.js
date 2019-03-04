module.exports = (sequelize,Datatypes) =>
    sequelize.define('PassTripStatus' , {
        status: Datatypes.STRING,   // status message
        code: Datatypes.STRING     // short code

    })