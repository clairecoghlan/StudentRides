const fs = require('fs')
const path = require('path')
const {Sequelize} = require('sequelize')
const config=require('../config/config')
const db = {}   // this will be our database object - with all our models
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

fs
    .readdirSync(__dirname)
    .filter((file)=>
        file !== 'index.js'
    )
    .forEach((file)=>{
        const model = sequelize.import(path.join(__dirname,file))
        db[model.name]=model
    })
console.log(db)


db.User.hasOne(db.PassProfile)
// db.PassProfile.belongsTo(db.User)

db.PassProfile.hasMany(db.PassSchedule)
// db.PassSchedule.belongsTo(db.PassProfile)  // the pass profile
db.PassSchedule.belongsTo(db.DaysOfWeek)  // FK for days of week
db.PassSchedule.belongsTo(db.DriverProfile)      // the remembered driver

db.PassProfile.hasMany(db.PassTrips)
// db.PassTrips.belongsTo(db.PassProfile)
db.PassTrips.belongsTo(db.DaysOfWeek)  // FK for days of week
db.PassTrips.belongsTo(db.Weeks)      // FK for week number
db.PassTrips.belongsTo(db.PassTripStatus)      // a status
db.PassTrips.belongsTo(db.DriverProfile)      // which driver
db.PassTrips.belongsTo(db.DriverTrips)      // which driver leg

db.PassProfile.hasMany(db.PassPickupPoints)
// db.PassPickupPoints.belongsTo(db.PassProfile)

db.User.hasOne(db.DriverProfile)
// db.DriverProfile.belongsTo(db.User)

db.DriverProfile.hasMany(db.DriverWaypoints)
// db.DriverWaypoints.belongsTo(db.DriverProfile)

db.DriverProfile.hasMany(db.DriverSchedule)
// db.DriverSchedule.belongsTo(db.DriverProfile)
db.DriverSchedule.belongsTo(db.DaysOfWeek)  // FK for days of week

db.DriverProfile.hasMany(db.DriverTrips)
// db.DriverTrips.belongsTo(db.DriverProfile)
db.DriverTrips.belongsTo(db.DaysOfWeek)  // FK for days of week
db.DriverTrips.belongsTo(db.Weeks)      // FK for week number
db.DriverTrips.belongsTo(db.DriverTripStatus)   // a status

db.sequelize=sequelize
db.Sequelize=Sequelize




module.exports = db


