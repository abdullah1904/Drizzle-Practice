import { Router } from "express";
import { createArticle, getArticles } from "../controllers/articleController";

const router = Router();

router.post('/create',createArticle);
router.get('/get',getArticles);

export {router as articleRouter};