module.exports = func => { //Friday July 22nd 2022 4:44pm
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
} 