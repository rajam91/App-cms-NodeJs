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

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = await pool.query('INSERT INTO users(user_name,user_email,user_password) VALUES ($1, $2, $3) RETURNING *',
        [req.body.user_name, req.body.user_email,hashedPassword]);
        res.json({users:newUser.rows[0]})
    } catch (error) {

        res.status(500).json({error: error.message});
    }
   
});

router.get('/artciles', authenticateToken, async (req, res) => {
    try {
        // Récupérez les données de la page en utilisant l'api builder
        const builderApiResponse = await axios.get('https://cdn.builder.io/api/v3/content/articles?apiKey=6e139f4f71454a88b3f01ee85b1a35b5');

        const pageData = builderApiResponse.data;

        res.json(pageData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
