module.exports = (sequelize,Datatypes) =>
    sequelize.define('User' , {
        email: {
            type: Datatypes.STRING,
            unique: true,
            allowNull : false
        },
        password: {
            type: Datatypes.STRING,
            allowNull : false
        },
        isAdmin: {
            type: Datatypes.BOOLEAN,
            default: false
        },
        // isDriver: {      // simply the opposite of isPassenger
        //     type: Datatypes.BOOLEAN,
        //     default: false
        // },
        isPassenger: {
            type: Datatypes.BOOLEAN,
            default: true
        },
        home: String
    })
