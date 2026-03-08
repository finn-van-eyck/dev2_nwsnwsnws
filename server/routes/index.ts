import express, { Request, Response, Router } from "express";
import { getNews, getNewsBySlug } from "../services/newsService";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response): void => {
  const news = getNews();

  res.render("index", {
    title: "Nieuws overzicht",
    pageCss: "home.css",
    news: news
  });
});

router.get("/news/:slug", (req: Request, res: Response): void => {
  const slug = String(req.params.slug);
  const article = getNewsBySlug(slug);

  if (!article) {
    res.status(404).send("Artikel niet gevonden");
    return;
  }

  res.render("detail", {
    title: article.title,
    pageCss: "details.css",
    article: article
  });
});

export default router;