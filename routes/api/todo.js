const express = require('express');

const db = require('./../../database');

const router = express.Router();

router.get('/', (req, res) => {
  db.select()
    .from('todo')
    .orderBy('id')
    .then((data) => {
      res.send(data);
    });
});

router.get('/:id', (req, res) => {
  db('todo')
    .where({ id: req.params.id })
    .first()
    .then((data) => {
      res.send(data);
    });
});

router.post('/', (req, res) => {
  db.insert(req.body)
    .returning('*')
    .into('todo')
    .then((data) => {
      res.send(data);
    });
});

router.put('/:id', (req, res) => {
  db('todo')
    .where({ id: req.params.id })
    .update({
      title: req.body.title || null,
      is_done: req.body.is_done || null,
    })
    .returning('*')
    .then((data) => {
      res.send(data);
    });
});

router.patch('/:id', (req, res) => {
  db('todo')
    .where({ id: req.params.id })
    .update(req.body)
    .returning('*')
    .then((data) => {
      res.send(data);
    });
});

router.delete('/:id', (req, res) => {
  db('todo')
    .where({ id: req.params.id })
    .del()
    .then((data) => {
      res.send({ success: true });
    });
});

module.exports = router;
