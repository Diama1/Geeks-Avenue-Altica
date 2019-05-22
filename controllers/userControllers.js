/* eslint-disable import/no-unresolved */
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../models";
import HashHelper from "../helpers/Hash.helper";

const { User } = db;

dotenv.config();

export default class UserController {
    static async createAccount(req, res) {
        const { fullNames, email, password } = req.body;
        try {
            const checkExistance = await User.findAll({
                where: {
                    email,
                },
            });
            if (checkExistance.length > 0) {
                return res.status(200).json({
                    status: 200,
                    message: "Email or Account already exists",
                });
            }

            const newUserAcc = await User.create({
                fullNames,
                email,
                password: HashHelper.hashPassword(password)
            });
            if (Object.keys(newUserAcc.dataValues).length > 0) {
                const token = jwt.sign({
                    email,
                    id: newUserAcc.dataValues.id,
                    fullNames: newUserAcc.dataValues.fullNames,
                }, process.env.SECRET_KEY, {
                    expiresIn: 86400, // this will expire in one day
                });

                return res.status(201).json({
                    status: 201,
                    message: "you have successfully created an account",
                    data: newUserAcc.dataValues,
                    token,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async loginUser(req, res) {
        const { email, password } = req.body;

        try {
            const checkUser = await User.findAll({
                where: {
                    email,
                },
            });
            if (checkUser.length > 0
      && HashHelper.comparePassword(password, checkUser[0].dataValues.password)) {
                const token = jwt.sign({
                    email: checkUser[0].dataValues.email,
                    id: checkUser[0].dataValues.id,
                }, process.env.SECRET_KEY, {
                    expiresIn: 86400, // this is equivalent to a day in seconds
                });
                // const loggedInUser = checkUser[0].dataValues;
                return res.status(200).json({
                    status: 200,
                    message: "Logged in Successfully",
                    token,
                });
            }

            return res.status(400).json({
                status: 400,
                error: "you must first sign up to the system",
            });
        } catch (error) {
            console.log(error);
        }
    }
}
