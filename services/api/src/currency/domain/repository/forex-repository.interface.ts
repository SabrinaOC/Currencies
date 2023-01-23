import { Nullable } from "src/utils";
import { Forex } from "../models/forex";

export interface IForexRepository {
  //  registerForex(forex: Forex): Promise<void>;
   getCurrentValue(code: string): Promise<Forex>;
   getYesterdayValue(code: string): Promise<Forex>;
  // findByCode(code: string): Promise<Nullable<Currency>>;
  // unsubscribe(currency: Currency): Promise<void>;
}
