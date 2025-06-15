export const useStore = defineStore("useStore", () => {
  const { t } = useI18n();

  // format currency
  function formatCurrency(amount: number) {
    if (typeof amount !== "number") {
      throw new Error(t("currency.invalidNumber"));
    }
    const formatted = amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${t("sum")}`;
  }


  return {
    formatCurrency,
  };
});
