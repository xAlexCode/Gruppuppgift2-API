import { Request, Response } from "express";
import User from "../models/user";

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



