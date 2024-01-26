import express from 'express'; // import le framework express
import pool from '../db.js';  //  import pool de la base de donnée
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt.js';

const router = express.Router();

router.post('/login', async (req,res) => {
try {
    const {email,password} =req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
    if(user.rows.length === 0) return res.status(401).json('Email is incorrect');
    const validPassword = await bcrypt.compare(password,user.rows[0].user_password);
    if(!validPassword) return res.status(401).json('Password is incorrect');
    return res.status(200).json('sucess');
    let tokens = jwtTokens(utilisataur.rows[0]);
    res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
    res.json(tokens);


} catch (error) {
    res.status(401);json({error: error.message});
}
});

router.get('/refresh_token', (req,res)=> {
    try {
        const RefreshToken = rq.cookies.refreshToken;
        if(refreshToken === null) return res.status(401).json({error : error.message});
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(rror,utilisataur) => {
            if(error) return res.status(403).json({error: error.message});
            let tokens = jwtTokens(utilisataur);
            res.cookie('refresh_token',tokens.refreshToken, {httpOnly:true});
            res.json(tokens);
        })
    } catch (error){
        res.status(401).json({error: error.message});
    }
})


router.delete('/logout', (req, res)=> {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message:'refresh token deleted'});

    } catch (error) {
        res.status(401).json({error: error.message});
    }
}) 

export default router;