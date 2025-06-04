export const useStore = defineStore("useStore", () => {
  const { t } = useI18n();

  // error messages
  function getMessage(key: string, min = 8, max = 100) {
    return {
      "number.base": t("number.base", { key }),
      "number.empty": t("number.empty", { key }),
      "number.min": t("number.min", { key, min }),
      "number.max": t("number.max", { key, max }),
      "number.required": t("number.required", { key }),
      "any.required": t("any.required", { key }),
      "string.base": t("string.required", { key }),
      "string.required": t("string.required", { key }),
      "string.empty": t("string.empty", { key }),
      "string.min": t("string.min", { key, min }),
      "string.invalid": t("string.invalid", { key }),
      "data.invalid": t("data.invalid", { key }),
    };
  }

  // format currency
  function formatCurrency(amount: number) {
    if (typeof amount !== "number") {
      throw new Error(t("currency.invalidNumber"));
    }
    const formatted = amount.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${t("sum")}`;
  }

  //===============================-< enable disable body scrool >-===============================
  //> variables
  const isScroolBlocked = ref(false)
  const enableScrool = () => {
    document.body.style.height = 'auto'
    document.body.style.overflow = 'auto'
    isScroolBlocked.value = false
  }
  const disableScrool = () => {
    document.body.style.height = '100dvh'
    document.body.style.overflow = 'hidden'
    isScroolBlocked.value = true
  }

  return {
    isScroolBlocked,
    getMessage,
    formatCurrency,
    enableScrool,
    disableScrool
  };
});
