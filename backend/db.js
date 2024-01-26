import pg from 'pg';
const {Pool} = pg;

let localPool = {
    user: 'postgres',
    host:'localhost',
    port: '5432',
    database: 'testtechn'
};

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL, 
    ssl:{rejectUnauthorized:false}
} : localPool;

const pool = new Pool(poolConfig);
export default pool;

// voir documentation pour ce fichier 