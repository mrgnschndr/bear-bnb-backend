const { Pool } = require('pg');
const params = {
    user: 'postgres', //Default user
    host: 'localhost',
    
}
const pool = new Pool(params)
if (pool) {
    console.log("Connection Successful.")
}
module.exports = pool;