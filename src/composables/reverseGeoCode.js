import { ref } from "vue";
import axios from "axios";

export function useReverseGeoCode() {
  const loading = ref(false);
  const error = ref(null);
  const result = ref(null);

  const locate = async (latitude, longitude) => {
    loading.value = true;
    error.value = null;
    result.value = null;

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
        }
      );
      result.value = response.data;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    locate,
    loading,
    error,
    result,
  };
}
