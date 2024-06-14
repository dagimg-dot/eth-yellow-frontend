import { toast } from "vue3-toastify";

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const locateUser = async (locate) => {
  try {
    const { coords } = await getCurrentPosition();

    await locate(coords.latitude, coords.longitude);
  } catch (error) {
    toast.error("Failed to locate user");
  }
};
