import express from 'express'
import { AuthControllers } from '../controllers'
export const router = express.Router()

router.route('/register').post(AuthControllers.RegisterController)
router.route('/login').post(AuthControllers.LoginController)
