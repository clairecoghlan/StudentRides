const {DaysOfWeek} = require('../models')

module.exports = {
    async setDaysOfWeek (req,res){ // this replies to a register api request
        try {
            console.log( 'server: set days of week', )
            DaysOfWeek.create({id:1,day:'Mon'})
            DaysOfWeek.create({id:2,day:'Tue'})
            DaysOfWeek.create({id:3,day:'Wed'})
            DaysOfWeek.create({id:4,day:'Thu'})
            DaysOfWeek.create({id:5,day:'Fri'})

            return res.send({
                success: `Days of week successfully created!`
            })
        } catch(err) {
            console.log(`Server: An error occurred creating days of week ${err}`)
            return res.status(500).send({
                error: `Server: An error occurred creating days of week`,
                original: err
            })
        }
    }
}