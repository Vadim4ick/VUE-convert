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
}

const defaultValue: CurrencyState = {
  currency: currencies,
  currentCurrency: defaultCurrency,
  exchangeRates: {},
};

export const useCurrencyStore = defineStore("currency", {
  state: () => defaultValue,
  getters: {
    // isAuth: (state) => Boolean(state.user.email),
  },

  actions: {
    async fetchExchangeRates() {
      try {
        const data = await fetchExchangeRates();

        this.$patch({ exchangeRates: data });
      } catch (error) {
        throw Error("Не удалось получить курсы валют");
      }
    },

    toggle(val: Currency) {
      this.$patch({
        currentCurrency: val,
      });
    },
  },
});
