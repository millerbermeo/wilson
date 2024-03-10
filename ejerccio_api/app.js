import  express  from "express";
import prueba from "./routers/router.prueba.js";
import body_parse from "body-parser"

const app = express()

app.use(body_parse.json())
app.use('/', prueba);

app.listen(3000,()=>{
    console.log('funciona');
});





