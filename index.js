const qr = require('qrcode')
const express = require('express');
const app = express();
const path = require('path')
let data = {
    id:1,
    name:'user1',
    email:'user1@gmail.com'
};

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));

let strData = JSON.stringify(data)

const qrCode = qr.toString(strData,{type:'svg'},function(err,code){
    if(err) return console.log('error occurred');
    else return code;
})


const qrData = qr.toDataURL(strData,function(err,code){
    if(err) return console.log('Error occured in Data URL generation');
    else return code;
})


app.get('/',(req,res) => {
    res.render('index');
    // res.send(qrCode);
})
app.listen(3000,() => console.log('server is running on port 3000'))