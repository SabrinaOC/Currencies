import { ForexController } from "@app/currency/infrastructure/controller/forex.controller";
import { Request, Response, Router } from "express";

const forexRouter: Router = Router();
const forexController = new ForexController();

forexRouter.post("/api/forex", async (req: Request, res: Response) => {
  forexController.registerForex(req, res);
});

forexRouter.get("/api/forex/history/:code", async (req: Request, res: Response) => {
  forexController.findForexHistoryMax(req, res);
});

// forexRouter.put(
//   "/api/currency/:code",
//   async (req: Request, res: Response) => {
//     forexController.unsubscribe(req, res);
//   }
// );

export default forexRouter;
