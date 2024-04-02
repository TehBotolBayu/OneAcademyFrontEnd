import axios from "axios";
import { toast } from "react-hot-toast";

const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorMessage = error.response.data.error;
      toast.error(errorMessage, {
        duration: 2000,
      });
    } else {
      // Respon tidak diterima dari server
      toast.error("Error: No response received from the server", {
        duration: 2000,
      });
    }
  } else {
    // Kesalahan selain dari Axios
    toast.error("An unexpected error occurred", {
      duration: 2000,
    });
  }
};

export default handleApiError;
