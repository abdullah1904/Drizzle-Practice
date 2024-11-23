import { Request, Response } from "express"
import { db } from "..";
import { ArticleTable } from "../models";

const createArticle = async(req:Request, res:Response)=>{
    const {title, body, authorId} = req.body;
    try{
        const article = await db.insert(ArticleTable).values({title, body, authorId}).returning({
            id: ArticleTable.id,
            title: ArticleTable.title,
            body: ArticleTable.body,
            authorId: ArticleTable.authorId
        });
        res.status(201).json(article);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

const getArticles = async(req:Request, res:Response)=>{
    try{
        const articles = await db.query.ArticleTable.findMany({
            with: {authorId: true},
        });
        res.status(200).json(articles);
    }
    catch(err:any){
        res.status(500).json({'Message': err.message});
    }
}

export {createArticle, getArticles};