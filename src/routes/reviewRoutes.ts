import express from 'express'
import { fetchAllReviews, 
         fetchReview,
         createReview,
         updateReview,
         deleteReview
} from '../controllers/reviewController'
import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.get('/', fetchAllReviews)
router.get('/:id', fetchReview)
router.post('/', createReview)
router.patch('/:id', verifyToken, updateReview)
router.delete('/:id', verifyToken, deleteReview)
export default router
