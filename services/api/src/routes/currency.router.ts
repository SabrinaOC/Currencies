import { Request, Response, Router } from "express";
import { CurrencyController } from "@app/currency";

const currencyRouter: Router = Router();
const currencyController = new CurrencyController();

currencyRouter.post("/api/currency", async (req: Request, res: Response) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  // res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.set('Access-Control-Allow-Headers', 'Content-Type');
  // console.log('headers:', res)
  currencyController.subscribe(req, res);
});

currencyRouter.get("/api/currencies", async (req: Request, res: Response) => {
  currencyController.findAllSubscribedCurrencies(req, res);
});

currencyRouter.put(
  "/api/currency/:code",
  async (req: Request, res: Response) => {
    currencyController.unsubscribe(req, res);
  }
);

export default currencyRouter;
