import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../models/user"


export const login = async (req: Request, res: Response) => {

    const { username, password } = req.body

    // Check that username and password were provided
    if (username === undefined || password === undefined) {

        res.status(400).json({
            message: 'username and password are required'
        })

        return
    }

    try {

        // Find the user in MongoDB
        const user = await User.findOne({ username })

        if (!user) {

            res.status(401).json({
                message: 'username/password are wrong'
            })

            return
        }

        // Compare the submitted password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        )

        if (!isPasswordCorrect) {

            res.status(401).json({
                message: 'username/password are wrong'
            })

            return
        }

        // Create JWT
        const accessToken = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET || "",
            { expiresIn: '7d' }
        )

        // Store JWT in httpOnly cookie
        res.cookie('accessToken', accessToken, {

            httpOnly: true,

            secure: false,

            sameSite: 'lax',

            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.json({
            message: 'You are logged in'
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

export const register = async (req: Request, res: Response) => {
    const {username, password} = req.body
    if (username === undefined || password === undefined) {
        res.status(400).json({message: 'username and password are required'})
        return
    }

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: { username: user.username, is_admin: user.is_admin } });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: "Registration failed" })
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('accessToken')
    res.json({message: "You are logged out"})
}
