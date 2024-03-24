module.exports = async (req, res, next) =>{
    const allowedCors = ['http://localhost:3000', 'http://italiarestaurant.mooo.com', 'https://italiarestaurant.mooo.com', 'http://www.italiarestaurant.mooo.com', 'https://www.italiarestaurant.mooo.com'];
    const {method} = req;
    const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
    const {origin}  = req.headers;

    if (method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
        // permitindo solicitações entre domínios com esses cabeçalhos
        res.header('Access-Control-Allow-Headers', requestHeaders);
        // finaliza o processamento da requisição e retorna o resultado para o cliente
        return res.end();
    }

    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    next();
}