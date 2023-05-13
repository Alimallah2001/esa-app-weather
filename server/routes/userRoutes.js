import express from 'express'

const router = express.Router()

import{
    loginController,
    registerController,
    authController,
 
}from '../controllers/userControllers.js'

import  {authMiddeleware} from '../middleware/authMiddleware.js'

router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddeleware ,authController)


export default router;

