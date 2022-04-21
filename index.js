const express = require('express');
const morgan =  require('morgan');
const {conectDatabase} = require('./database/index');
const cors = require('cors');
const app = express();
conectDatabase();

app.use(express.json({extended: false}));
app.use(cors())
app.use(morgan('tiny'));

app.get('/',(req, res)=>{
    return res.send({
        Error: false,
        message: 'Health 100%'
    })
})

app.use("/api/v1", require("./routes/index"));

app.use('**', (req,res)=>{
    return res.send({
       Error: true,
       message: 'not a route'
    })
})

const PORT = 3040 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is running on port: ${PORT}`);
})