import express from 'express'

import {
    getUsers,
    getUserById
} from '../controllers/userController'

import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.get('/', verifyToken, getUsers)

router.get('/:id', verifyToken, getUserById)

export default router