class ExpressError extends Error { //Friday July 22nd 2022 4:42pm
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}  
module.exports = ExpressError;