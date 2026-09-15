import express from 'express'

import {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController'

import { verifyToken } from '../middleware/verifyToken'

const router = express.Router()

router.get('/', verifyToken, getUsers)

router.get('/:id', verifyToken, getUserById)

router.patch('/:id', verifyToken, updateUser)

router.delete('/:id', verifyToken, deleteUser)

export default router