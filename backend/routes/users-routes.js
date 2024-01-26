import express from 'express'; // import le framework express
import pool from '../db.js';  //  import pool de la base de donnée
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router(); // créer un routeur express

router.get('/',authenticateToken,async(req, res)=> // récup tout les users de la bdd 
{
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({users : users.rows});
    } catch (error) {
        res.status(500).json({error: error.message}); // si erreur affiche message d'erreur dans la reponse json

    }

})
export default router;

/*router.post('/SignIn', async (req, res) => { // ajout d'un user dans la bdd
    try {
        const email = req.body.email;
        const password = req.body.password;
        
    }
});*/

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = await pool.query('INSERT INTO users(user_name,user_email,user_password) VALUES ($1, $2, $3) RETURNING *',
        [req.body.user_name, req.body.user_email,hashedPassword]);
        res.json({users:newUser.rows[0]})
    } catch (error) {

        res.status(500).json({error: error.message});
    }
   
})

