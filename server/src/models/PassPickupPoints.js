module.exports = (sequelize,Datatypes) =>
    sequelize.define('PassPickupPoints' , {
        location : {
            type: Datatypes.STRING
        }
    })
// relationships defined in index!!