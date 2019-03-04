module.exports = (sequelize,Datatypes) =>
    sequelize.define('PassProfile' , {
        isActive: {
            type: Datatypes.BOOLEAN
        },
        location: Datatypes.STRING
    })
// relationships defined in index!!