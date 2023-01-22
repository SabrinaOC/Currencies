import { model, Schema } from "mongoose";

const ForexSchema = new Schema(
  {
    fromCurrencyCode: String,
    fromCurrencyName: String,
    toCurrencyCode: String,
    toCurrencyName: String,
    exchangeRate: String,
    // date: String,
    bidPrice: String,
  },
  {
    timestamps: true,
  }
);

export default model("Forex", ForexSchema);
