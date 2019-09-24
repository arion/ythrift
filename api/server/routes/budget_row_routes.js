import { Router } from 'express'
import BudgetRowController from '../controllers/budget_row_controller'

const router = Router()

router.post('/', BudgetRowController.create)
router.put('/:id', BudgetRowController.update)

export default router