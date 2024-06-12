import { ref } from "vue";
import axios from "axios";

export function useReverseGeoCode() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);
  const cancelTokenSource = ref(null);

  const locate = async (latitude, longitude) => {
    loading.value = true;
    error.value = null;
    result.value = null;

    cancelTokenSource.value = axios.CancelToken.source();

    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "json",
            lat: latitude,
            lon: longitude,
            addressdetails: 1,
          },
          cancelToken: cancelTokenSource.value.token,
        }
      );
      result.value = response.data;
    } catch (err) {
      if (axios.isCancel(err)) {
        error.value = "Request canceled by user";
      } else {
        error.value = err;
      }
    } finally {
      loading.value = false;
    }
  };

  const abort = () => {
    if (cancelTokenSource.value) {
      cancelTokenSource.value.cancel();
    }
  };

  return {
    locate,
    loading,
    error,
    result,
    abort,
  };
}
