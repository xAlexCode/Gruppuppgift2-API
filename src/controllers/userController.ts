import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";




export const register = async (req: Request, res: Response) => {

    const { username, password } = req.body


    if (username === undefined || password === undefined) {

        res.status(400).json({
            message: 'username and password are required'
        })

        return
    }

    try {


        const existingUser = await User.findOne({ username })

        if (existingUser) {

            res.status(409).json({
                message: 'Username is already taken'
            })

            return
        }


        const hashedPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            username,
            password: hashedPassword,
            is_admin: false
        })


        res.status(201).json({
            message: 'You are registered',
            username: user.name,
            is_admin: user.is_admin,
            created_at: user.created_at
        })

    } catch (error) {
        
        console.log(error)

        res.status(500).json({
            message: 'Something went wrong'
        })

    }
}





export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error: unknown) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {


};

export const updateUser = async (req: Request, res: Response): Promise<void> => {

};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {

};



