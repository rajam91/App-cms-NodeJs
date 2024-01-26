import express from 'express'; // import le framework express
import pool from '../db.js';  //  import pool de la base de donnée
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

        if (user.rows.length === 0) return res.status(401).json({ error: 'Email is incorrect' });

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

        if (!validPassword) return res.status(401).json({ error: 'Password is incorrect' });
        let tokens = jwtTokens(user.rows[0]);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (refreshToken === null) return res.status(401).json({ error: 'Refresh token is null' });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: 'Invalid refresh token' });

            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

router.delete('/logout', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'Refresh token deleted' });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

export default router;
