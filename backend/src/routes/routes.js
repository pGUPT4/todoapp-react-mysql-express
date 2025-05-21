const express = require('express');
const router = express.Router();
const {createDB, createList, createTable, showList, singleList, updateListItem, deleteListItem} = require('../controllers/controller');


router.get('/create/database', createDB);
router.get('/create/table', createTable);
router.post('/create/list', createList);

router.get('/show/list', showList);

router.get('/listItem/:id', singleList);
router.put('/update/listItem/:id', updateListItem);
router.delete('/delete/listItem/:id', deleteListItem);

module.exports = router;