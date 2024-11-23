import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/userController";

const router = Router();

router.post('/create',createUser);
router.get('/get',getUsers);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);


export {router as userRouter};