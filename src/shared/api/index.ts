import axios from "axios";
import { ExchangeRates } from "../constants/currency.const";

const $api = axios.create({
  baseURL: "https://status.neuralgeneration.com/api",
});

export async function fetchExchangeRates() {
  try {
    const data = await $api.get<ExchangeRates>("/currency");

    return data.data;
  } catch (error) {
    throw Error("Не удалось получить курсы валют");
  }
}
