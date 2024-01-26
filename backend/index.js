// importation des modules 
import express , {json} from "express";
import cors from "cors"; // permets la communication entre le front et le back 
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; //faciliter la manipulation des cookies  
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import router from "./routes/users-routes.js";
import authrouter from "./routes/auth-routes.js";
import userRouter from "./routes/users-routes.js";


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

app.use('/api/users', userRouter);
app.use('/api/auth', authrouter);
app.use('api/articles',router)

app.listen(Port, ()=> console.log(`Server is listening on ${Port}`));



// EJS permet d'insérer du JV dans des fichiers HTML
// souvent utilisé avec express pour creer des pages web dynamiques
