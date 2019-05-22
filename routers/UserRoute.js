import express from 'express';
import UserController from '../controllers/userControllers';

const router = express.Router();

router.post('/signup', UserController.createAccount);
router.post('/login', UserController.loginUser);

export default router;