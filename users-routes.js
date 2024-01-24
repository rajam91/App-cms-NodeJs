import express from 'express'; // import le framework express
import pool from '../db.js';  //  import pool de la base de donnée

const router = express.Router(); // créer un routeur express

router.get('/',async(req, res)=> // récup tout les users de la bdd 
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


