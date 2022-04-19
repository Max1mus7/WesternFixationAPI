import express from 'express';
const router = express.Router();
import userDAO from '../data/DAOs/userDAO.js';
const dao = new userDAO();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const response = await dao.getAll();
  res.status(response.code).send(response);
});

export default router;
