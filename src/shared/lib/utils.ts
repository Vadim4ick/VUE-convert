import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency, ExchangeRates } from "../constants/currency.const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertCurrency(
  amount: number,
  fromCurrency: Currency,
  toCurrency: Currency,
  exchangeRates: Partial<ExchangeRates>
) {
  // Check if the currencies are the same
  if (fromCurrency === toCurrency) {
    return amount;
  }

  let rateKey = `${fromCurrency.toLowerCase()}-${toCurrency.toLowerCase()}`;

  const rate = exchangeRates[rateKey as keyof ExchangeRates];

  if (!rate) {
    throw new Error("Conversion rate not found");
  }

  return amount * rate;
}

export const convertCurrencyNumber = (amount: string | number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(+amount);
};
