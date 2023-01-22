import { Nullable } from "src/utils";
import { Forex } from "../models/forex";

export interface IForexRepository {
   registerForex(forex: Forex): Promise<void>;
  // findAllSubscriptions(): Promise<Currency[]>;
  // findByCode(code: string): Promise<Nullable<Currency>>;
  // unsubscribe(currency: Currency): Promise<void>;
}
