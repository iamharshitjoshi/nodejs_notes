const express = require('express');
const app = express();

// database connection ko server mai establish kar liya
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // convert json into js object and store in req.body 


app.get ('/', (req, res)=>{
    res.send("hi i am learning nodejs");
})

// Import the router files 
const menuItemRoutes = require('./routes/menuItemRoutes');
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes);
app.use('/menuItem', menuItemRoutes);


app.listen(3000, ()=>{
    console.log("Port is running on server 3000...")
});











