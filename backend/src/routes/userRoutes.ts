import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

// Base Route
router.get("/", function (req: Request, res: Response) {
    res.send('User Home Page');
});

// User Details
router.get("/details", function (req: Request, res: Response) {
    res.send('User Details Page');
});

export { router as UserRoutes };