const express = require('express');
const ExpressError = require('../middleware/expressError');
const router = new express.Router();
const items = require('../fakeDB');

router.get('/', (req, res) => {
    return res.json({ items });
});

router.post('/', (req, res, next) => {
    try {
        if (!req.body.name) throw new ExpressError('Missing Item Name', 400)
        else if (!req.body.price) throw new ExpressError('Missing Item Price', 400);
        const newItemName = req.body.name;
        const newItemPrice = req.body.price;
        const newItem = { name: newItemName, price: newItemPrice };
        items.push(newItem)
        return res.json({ added: newItem })
    } catch (e) {
        next(e)
    }
});

router.get('/:name', (req, res, next) => {
    try {
        let findItem = items.find(item => item.name === req.params.name);
        if (findItem === undefined) throw new ExpressError('Item Not Found', 404);
        return res.json({ item: findItem })
    } catch (e) {
        next(e)
    }
});

router.patch('/:name', (req, res, next) => {
    try {
        let findItem = items.find(item => item.name === req.params.name);
        if (findItem === undefined) throw new ExpressError('Item Not Found', 404);
        findItem.name = req.body.name;
        return res.json({ updated: { item: findItem } })
    } catch (e) {
        next(e)
    }
});

router.delete('/:name', (req, res, next) => {
    try{ 
        let deleteItem = items.find(item => item.name === req.params.name);
        if(deleteItem === undefined) throw new ExpressError('Item Not Found', 404);
        items.splice(deleteItem, 1);
        return res.json({message: 'Deleted'})
    } catch(e){
        next(e)
    }
});

module.exports = router;

