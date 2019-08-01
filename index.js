

const server = require('./utils/server');
const port = process.env.PORT || 5050;


server.listen(port, () => console.log('water my plants'))