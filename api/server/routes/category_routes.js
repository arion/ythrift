import { Router } from 'express'
import CategoryController from '../controllers/category_controller'

const router = Router()

router.get('/', CategoryController.all)
router.post('/', CategoryController.create)
router.put('/:id', CategoryController.update)
router.delete('/:id', CategoryController.delete)

export default router