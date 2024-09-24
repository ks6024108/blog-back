import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import  dotenv  from "dotenv";
dotenv.config()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({limit:'500mb',extended:true})) 
app.use(cors());

export default app;
