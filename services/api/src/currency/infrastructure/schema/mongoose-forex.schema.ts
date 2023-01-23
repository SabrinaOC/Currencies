import { model, Schema } from "mongoose";

const ForexSchema = new Schema(
  {
    fromCurrencyCode: String,
    fromCurrencyName: String,
    toCurrencyCode: String,
    toCurrencyName: String,
    exchangeRate: Number,
    bidPrice: Number,
    askPrice: Number,
    createdAt: Date
  },
  {
    timestamps: true,
  }
);

export default model("Forex", ForexSchema);
