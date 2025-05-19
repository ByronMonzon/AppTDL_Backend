var express = require('express');
var router = express.Router();

let tasks = [];

router.get('/getGoals', function(req, res, next){
    res.json(goals);
})

router.post('/addGoal', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
        goals.push(req.body);
        res.json(goals);
    }else{
        res.status(400).json([{}]);
    }
})

router.delete('/removeGoal/:id', function(req, res, next){
    if(req.params&& req.params.id){
        let id = req.params.id;
        goals = goals.filter(goal => goal.id !== id);
        res.json(goals);
    }else{
        res.status(400).json([{}]);
    }
})

module.exports = router;