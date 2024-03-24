module.exports = async (req, res, next) =>{
    const allowedCors = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://italiarestaurant.mooo.com',
        'https://italiarestaurant.mooo.com',
        'http://www.italiarestaurant.mooo.com',
        'https://www.italiarestaurant.mooo.com'
    ];
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const { origin }  = req.headers;
    const requestHeaders = req.headers['access-control-request-headers']; 

    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Explicitly defining allowed headers

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    if (method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
}
