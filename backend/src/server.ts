import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app: Express = express();
app.use(express.json());

// Variables
const PORT: string | number = process.env.PORT || 3001;
const VERSION: string = process.env.VERSION || "v1";
const PREFIX: string = `/${VERSION}`;

// Other Routes
import { UserRoutes } from "./routes/userRoutes";
app.use(`${PREFIX}/users`, UserRoutes);

import { PaymentRoutes } from "./routes/paymentRoutes";
app.use(`${PREFIX}/stripe`, PaymentRoutes);

// Base Route
app.get(PREFIX, (req: Request, res: Response) => {
    res.json({ message: `Default Endpoint - API version ${VERSION}` });
});

// Start
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});