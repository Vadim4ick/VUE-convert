import { defineStore } from "pinia";
import {
  Currency,
  ExchangeRates,
  currencies,
  defaultCurrency,
} from "../constants/currency.const";
import { fetchExchangeRates } from "../api";

interface CurrencyState {
  currency: Currency[];
  currentCurrency: Currency;
  exchangeRates: Partial<ExchangeRates>;
  isLoading: boolean;
}

const defaultValue: CurrencyState = {
  currency: currencies,
  currentCurrency: defaultCurrency,
  exchangeRates: {},
  isLoading: false,
};

export const useCurrencyStore = defineStore("currency", {
  state: () => defaultValue,
  getters: {},

  actions: {
    async fetchExchangeRates() {
      this.isLoading = true;

      try {
        const data = await fetchExchangeRates();
        this.$patch({ exchangeRates: data });
      } catch (error) {
        console.error("Не удалось получить курсы валют", error);
        throw Error("Не удалось получить курсы валют");
      } finally {
        this.isLoading = false;
      }
    },

    toggle(val: Currency) {
      this.$patch({
        currentCurrency: val,
      });
    },
  },
});
