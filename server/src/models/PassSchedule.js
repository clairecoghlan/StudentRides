module.exports = (sequelize,Datatypes) =>
    sequelize.define('PassSchedule' , {
        isActive: Datatypes.BOOLEAN,    // allow the pass to turn off
        // dow: Datatypes.INTEGER, // day of week
        leg: Datatypes.INTEGER, // outbound = 1 , return = 2
        arr: Datatypes.TIME,    // when the passenger must get there
        dep: Datatypes.TIME, // when passenger wants to leave
    })