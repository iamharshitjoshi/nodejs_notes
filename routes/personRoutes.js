const express = require('express');
const router = express.Router(); // express.Router manages routes 
const person = require('./../models/person');

// POST route to add a person 
router.post('/', async(req, res)=>{
    
    try{
       const data = req.body;

       // create a new person document using the mongoose model
       const newPerson = new person(data);

       // save the new person to the database 
       // if fails then went to the catch block
       const response = await newPerson.save();
       console.log('data saved');
       res.status(500).json(response);
    }
    catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
    }

})

// GET method to get the person data 
router.get('/', async(req, res)=>{
    try{
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async(req, res)=>{
    try{
        // extract the work type from the url parameter
        const workType = req.params.workType;

        if(workType == 'chef' || workType == 'manager'|| workType == 'waiter'){
            const response = await person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(500).json({error: 'invalid Worktype'});
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
        const personId = req.params.id;
        const updatePersonData = req.body; // updated data for the person

        const response = await person.findByIdAndUpdate(personId, updatePersonData, {
            new: true, // return the update document or response 
            runValidators: true, // return mongoose validation
        }); 
        
        // id not in person id se document present na hoa 
        if(!response){
            res.status(404).json({error: 'Person Not Found'});
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
        const personId = req.params.id;

        const response = await person.findByIdAndDelete(personId); 
        
        // personid is not present in the record 
        if(!response){
            res.status(404).json({error: 'Person Not Found'});
        }

        console.log('response delete');
        res.status(200).json({message: 'person deleted successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;