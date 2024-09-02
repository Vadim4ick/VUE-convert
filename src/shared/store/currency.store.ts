import { defineStore } from "pinia";
import {
  Currency,
  currencies,
  defaultCurrency,
} from "../constants/currency.const";

const defaultValue = {
  currency: currencies,
  currentCurrency: defaultCurrency,
};

export const useCurrencyStore = defineStore("currency", {
  state: () => defaultValue,
  getters: {
    // isAuth: (state) => Boolean(state.user.email),
  },

  actions: {
    // clear() {
    //   this.$patch(defaultValue);
    // },
    // set(inp) {
    //   this.$patch({ user: inp });
    // },

    toggle(val: Currency) {
      this.$patch({
        currentCurrency: val,
      });
    },
  },
});
