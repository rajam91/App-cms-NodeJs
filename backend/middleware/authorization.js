import jwt from 'jsonwebtoken';

function authenticateToken(req,res,next){ // cette fonction est définie comme middleware
    const authHeader = req.headers['auhtorization'];
    const token = authHeader && authHeader.split(' ')[1]; // on recupère le token dans le header
    if(token == null)return res.status(401).json('Null token'); // si token est absent renvoi null token
    jwt.verify(token,process.env.ACCEC_TOKEN_SECRET,(Error,utilisateur) => {
     if(error) return res.status(403).json({error: error.message});
     req.utilisateur = utilisateur;
     next();   // appelle la fonction next 
    })
}

export {authenticateToken};

// elle prends trois paramètres
// req : objet qui représente la demande HTTP 
// res : objet qui représente la demande HTTP
// next : La fonction qui appelle le middleware


// en résumé ce middleware vérifie la présence d'un token JWT 
// e valide à l'aide d'une clé secrète, 
//et stocke les info de l'utilisateur extraites du token