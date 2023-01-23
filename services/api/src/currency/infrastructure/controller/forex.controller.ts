import { Request, Response } from "express";
import {
  GetSubscribedCurrencies,
  SubscribeCurrency,
  UnsubscribeCurrency,
} from "@app/currency/application";
import { DomainError } from "@app/utils";
import { GetCurrentValue } from "@app/currency/application/get-current-value";
import { GetYesterdayValue } from "@app/currency/application/get-yesterday-value";

export class ForexController {
  private getCurrentValue = new GetCurrentValue({})
  private getYesterdayValue = new GetYesterdayValue({})


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

  async yesterdayValue(req: Request, res: Response) {
    try {
      const forex = await this.getYesterdayValue.execute(req.params.code);
      res.status(200).json({ data: forex });
    } catch (err) {
      let status = 500;
      if (err instanceof DomainError) {
        status = 400;
      }
      res.status(status).json({ data: err.message });
    }
  }

}
