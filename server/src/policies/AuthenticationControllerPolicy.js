const Joi = require('joi')
module.exports = {
    login(req, res, next) {
        next()
    },
    register (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        const {error, value} = Joi.validate(req.body, schema)
        if(error) {
            // depending on cause of error
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send( {error: 'You must provide a valid email address' })
                    break
                case 'password':
                    res.status(400).send({
                        error: `
                            The password provided failed to meet the following requirements
                            <br/>
                            1. It must contain ONLY the following characters a-z A-Z 0-9
                            <br/>
                            2. It must be between 8 & 32 characters in length
                            <br/>
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration details'
                    })
            }
        } else {
            next()
        }
    }
}