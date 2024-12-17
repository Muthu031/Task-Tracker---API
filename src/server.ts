import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import path from 'path';
import http from 'http';


 
 
const app = express();
 
const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));
app.use('/asset', express.static(path.join(__dirname, '../asset')));
console.log('Upload directory:', path.join(__dirname, '../asset'));
 
app.use("/public", express.static(path.join(__dirname, "public")));
 
const port =  3000;
console.log("Port:", port);
 
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
 
app.use(morgan("dev"));
app.get('/health-check', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'src', 'public', 'index.html'));
});
 
app.get('/socket-health-check',(req,res)=>{
     res.sendFile(path.join(__dirname, '..', 'src', 'public', 'socket-test.html'));
});


 
require("./api/registerRoutes").default(app);
const server = http.createServer(app);


server.listen(port, () => {
    console.log("--- System check complete ---");
});