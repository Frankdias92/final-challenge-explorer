const AppError = require("../utils/AppError")

// ['admin', 'customer', 'sale'].includes('sale')

function verifyAuthorization(roleToVerify) {
    return (req, res, next) => {
        const { role } = req.user

        if ( !roleToVerify.includes(role) ) {
            throw new AppError('Unauthorized', 401)
        }

        return next()
    }
}

module.exports = verifyAuthorization