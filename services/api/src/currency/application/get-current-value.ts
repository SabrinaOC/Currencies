import { IForexRepository } from "../domain";
import { MongooseForexRepository } from "../infrastructure";

export class GetCurrentValue {
  private forexRepository: IForexRepository;
  constructor({ forexRepository = new MongooseForexRepository() }) {
    this.forexRepository = forexRepository;
  }

  async execute(currencyCode: string) {
    return await this.forexRepository.getCurrentValue(currencyCode);
  }
}
