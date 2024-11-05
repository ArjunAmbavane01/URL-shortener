const express = require('express');

const app = express();

app.post('/url',(req,res)=>{

})

app.get('/:id',(req,res)=>{

})

app.get('/url/analytics/:id',(req,res)=>{

})

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})