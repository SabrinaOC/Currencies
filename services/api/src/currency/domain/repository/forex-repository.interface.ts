import { Nullable } from "src/utils";
import { Forex } from "../models/forex";

export interface IForexRepository {
   getCurrentValue(code: string): Promise<Forex>;
   getYesterdayValue(code: string): Promise<Forex>;
}
