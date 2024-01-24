// importation des modules 
import express , {json} from "express";
import cors from "cors"; // permets la communication entre le front et le back 
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; //faciliter la manipulation des cookies  
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import router from "./routes/users-routes";
import bcrypt from "bcrypt";


const app = express();
dotenv.config();
const Port = process.env.PORT || 3000;


app.set('view engine', 'ejs');

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'));

const corsOptions = {Credential:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/',express.static(join(__dirname, 'public')));

app.use('/api/users', router);


const Users = []; // stocker un utilisateur

app.post('/SignIn', function(req, res){  // endpoint pour ajouter un utilisateur 
    const{user_id,user_name, user_email,user_password,} = req.body;

    const hashedPassword = bcrypt.hash(user_password, 10); // hasher le mot de passe 

    Users.push(  // sauvegarde des données dans la database 
        {
            user_id : user_id,
            user_email: user_email,
            user_password: hashedPassword,
            user_name: user_name
         });

    res.send('User added');
});


app.get('/LogIn', function(req, res){  // endpoint pour se connecter 
    const{user_email, user_password} = req.body;

    // trouver l'utilisateur dans la database 
    const user = Users.find((u) => u.user_email === user_email);
    if (!user) {
        return res.status(400).send('User not found');
    }

    // générer un JWT token
    const token = jwt.sign({ id: user.user_id,password:user.user_password }, process.env.JWT_Secret);
    res.json({token});

})



app.listen(Port, ()=> console.log(`Server is listening on ${Port}`));



// EJS permet d'insérer du JV dans des fichiers HTML
// souvent utilisé avec express pour creer des pages web dynamiques
