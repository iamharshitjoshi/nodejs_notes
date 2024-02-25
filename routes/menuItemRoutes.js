const express = require('express');
const router = express.Router(); // express.Router manages routes 
const menuItem = require('./../models/menuItem');

// Post method to add menu item 
router.post('/', async(req, res)=>{
    try{
       const data = req.body;
       const newMenu = menuItem(data);
       const response = await newMenu.save();
       console.log('data saved');
       res.status(500).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }
})

//  GET method to get the menu data 
router.get('/', async(req, res)=>{
    try{
        const data = await menuItem.find();
        console.log('menu data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:tasteType', async(req, res)=>{
    try{
        // extract the menu type from the url parameter
        const tasteType = req.params.tasteType;

        if(tasteType == 'sour' || tasteType == 'spicy'|| tasteType == 'sweet'){
            const response = await menuItem.find({taste: tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(500).json({error: 'invalid menuTaste'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.put('/:id', async(req, res)=>{
    try{
        // extract the id from the url parameter
        const menuId = req.params.id;
        const updatemenuData = req.body; // updated data for the person

        const response = await menuItem.findByIdAndUpdate(menuId, updatemenuData, {
            new: true, // return the update document or response 
            runValidators: true, // return mongoose validation
        }); 
        
        // id not in person id se document present na hoa 
        if(!response){
            res.status(404).json({error: 'menuItem Not Found'});
        }

        console.log('response updated');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        // extract the id from the url parameter
        const menuId = req.params.id;

        const response = await menuItem.findByIdAndDelete(menuId); 
        
        // personid is not present in the record 
        if(!response){
            res.status(404).json({error: 'menuItem Not Found'});
        }

        console.log('response delete');
        res.status(200).json({message: 'menuItem deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;