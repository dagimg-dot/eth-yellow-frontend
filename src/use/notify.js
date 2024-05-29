import { useTimeoutFn } from "@vueuse/core";
import { computed, ref } from "vue";

const store = ref({
  notification: { state: false },
});
export default function ({ timeout = 10000 } = {}) {
  const { start, stop } = useTimeoutFn(() => {
    store.value.notification = { state: false };
  }, timeout);
  
  stop();

  const notify = ({
    title = "",
    description = "",
    icon = undefined,
    iconClass = "",
    titleClass = "",
    closeButtonClass = "",
    descriptionClass = "",
    cardClass = "",
  } = {}) => {
    store.value.notification = {
      state: true,
      title,
      description,
      icon,
      iconClass,
      titleClass,
      descriptionClass,
      closeButtonClass,
      cardClass
    };
    start();
  };
  const dismis = () => {
    store.value.notification = { state: false };
  };


  return {
    notify,
    dismis,
    notification: computed(() => store.value.notification),
  };
}
