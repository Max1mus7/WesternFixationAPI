import express from 'express';
const router = express.Router();
import userDAO from '../data/DAOs/userDAO.js';
const dao = new userDAO();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const response = await dao.getAll();
  res.status(response.code).send(response);
});

router.get('/:id', async (req, res, next) => {
  const response = await dao.getOne(req.params.id);
  res.status(response.code).send(response);
});

router.post('/new', async (req, res, next) => {
  const response = await dao.create(req.body);
  res.status(response.code).send(response);
});

router.put('/update/:id', async (req, res, next) => {
  const response = await dao.update(req.params.id, req.body);
  res.status(response.code).send(response);
});

router.delete('/delete/:id', async (req, res, next) => {
  const response = await dao.delete(req.params.id);
  res.status(response.code).send(response);
});

export default router;
