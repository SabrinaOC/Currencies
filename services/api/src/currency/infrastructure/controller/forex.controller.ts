import { Request, Response } from "express";
import {
  GetSubscribedCurrencies,
  SubscribeCurrency,
  UnsubscribeCurrency,
} from "@app/currency/application";
import { DomainError } from "@app/utils";
import { RegisterForex } from "@app/currency/application/registerForex";
import { GetCurrentValue } from "@app/currency/application/get-current-value";

export class ForexController {
  // private registerForexData = new RegisterForex({});
  private getSubscribedCurrencies = new GetSubscribedCurrencies({});
  private unsubscribeCurrency = new UnsubscribeCurrency({});
  private getCurrentValue = new GetCurrentValue({})

  // async registerForex(req: Request, res: Response) {
  //   try {
  //     const forex = await this.registerForexData.execute(req.body);
  //     res.status(200).json({ data: forex });
  //   } catch (err) {
  //     let status = 500;
  //     if (err instanceof DomainError) {
  //       status = 400;
  //     }
  //     res.status(status).json({ data: err.message });
  //   }
  // }

  async currentValue(req: Request, res: Response) {
    try {
      const forex = await this.getCurrentValue.execute(req.params.code);
      res.status(200).json({ data: forex });
    } catch (err) {
      let status = 500;
      if (err instanceof DomainError) {
        status = 400;
      }
      res.status(status).json({ data: err.message });
    }
  }

  // async unsubscribe(req: Request, res: Response) {
  //   try {
  //     const currency = await this.unsubscribeCurrency.execute(req.params.code);
  //     res.status(200).json({ data: currency });
  //   } catch (err) {
  //     let status = 500;
  //     if (err instanceof DomainError) {
  //       status = 400;
  //     }
  //     res.status(status).json({ data: err.message });
  //   }
  // }

}
