import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";



export const createUser = async (req: Request, res: Response): Promise<void> => {

    try {

        const { username, password, is_admin } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            is_admin
        });

        res.status(201).json(user);

    } catch (error: unknown) {

        if (error instanceof Error && "code" in error && error.code === 11000) {

            res.status(409).json({
                message: "Username is already taken"
            });

            return;
        }

        res.status(500).json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });

    }

};



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



