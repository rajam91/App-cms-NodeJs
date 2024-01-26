import jwt from 'jsonwebtoken';

function jwtTokens({user_id,user_name,user_email}) {
    const utilisateur = {user_id,user_name,user_email};
    const accesToken =jwt.sign(utilisateur,process.env.ACCES_TOKEN_SECRET,{expiresIn: '20s'});
    const refreshToken =jwt.sign(utilisateur,process.env.REFRESH_TOKEN_SECRET,{expiresIn: '2m'});
    return {accesToken,refreshToken};
}


export {jwtTokens};

