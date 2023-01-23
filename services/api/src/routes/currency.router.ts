import { Request, Response, Router } from "express";
import { CurrencyController, ForexController } from "@app/currency";

const currencyRouter: Router = Router();
const currencyController = new CurrencyController();
const forexController = new ForexController();

currencyRouter.post("/api/currency", async (req: Request, res: Response) => {
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

currencyRouter.get("/api/forex", (req, res) => {
  res.send('HOLA CARACOLA')
})

currencyRouter.get("/api/forex/current/:code", async (req: Request, res: Response) => {
  res.send('HOLA HOLA')
  // forexController.currentValue(req, res);
});

export default currencyRouter;
