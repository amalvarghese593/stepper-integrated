import axios from "axios";

export const useAxios = () => {
  const callApi = async (url, method, options) => {
    try {
      const response = await axios[method](url, options);
      return response;
    } catch (error) {
      return error.message;
    }
  };

  return { callApi };
};
