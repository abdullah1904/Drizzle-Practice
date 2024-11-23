import { Request, Response } from "express"
import {db} from "../";
import { UserTable } from "../models";
import { eq } from "drizzle-orm";

const createUser = async(req:Request, res:Response)=>{
    const {name, email} = req.body;
    try{
        const user = await db.insert(UserTable).values({name, email}).returning({
            id: UserTable.id,
            name: UserTable.name,
            email: UserTable.email
        });
        res.status(201).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const getUsers = async(req:Request, res:Response)=>{
    try{
        const users = await db.query.UserTable.findMany({
            with: {articles: true}
        })
        res.status(200).json(users);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const updateUser = async(req:Request, res:Response)=>{
    const {name} = req.body;
    const {id} = req.params;
    try{
        const user = await db.update(UserTable).set({name}).where(eq(UserTable.id, id)).returning({
            id: UserTable.id,
            name: UserTable.name,
            email: UserTable.email
        });
        res.status(200).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const deleteUser = async(req:Request, res:Response)=>{
    const {id} = req.params;
    try{
        const user = await db.delete(UserTable).where(eq(UserTable.id, id));
        res.status(200).json(user);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

export {createUser, getUsers, updateUser,deleteUser};