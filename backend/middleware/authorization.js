import jwt from 'jsonwebtoken';

function authenticateToken(req,res,next){
    const authHeader = req.headers['auhtorization'];
    const token = authHeader && authHeader.split(' ')[1]; // on recupère le token dans le header
    if(token == null)return res.status(401).json('Null token');
    jwt.verify(token,process.env.ACCEC_TOKEN_SECRET,(Error,utilisateur) => {
     if(error) return res.status(403).json({error: error.message});
     req.utilisateur = utilisateur;
     next();   
    })
}

export {authenticateToken};
