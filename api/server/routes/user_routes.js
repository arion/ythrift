import { Router } from 'express'
import UserController from '../controllers/user_controller'

const router = Router()

router.get('/', UserController.all)
// router.post('/', UserController.create)
router.get('/:id', UserController.find)
router.put('/:id', UserController.update)
// router.delete('/:id', UserController.delete)

export default router