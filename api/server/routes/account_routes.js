import { Router } from 'express'
import AccountController from '../controllers/account_controller'

const router = Router()

router.get('/', AccountController.get)

export default router