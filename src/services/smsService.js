import { axiosInstance } from "../utils/axiosHelper";

export const sendSms = async (values) => {
  const response = await axiosInstance.post("/sms/", {
    phoneNumber: values.phoneNumber,
    message: values.message,
  });

  return response.data;
};

export const getSmsStats = async (phoneNumber) => {
  const response = await axiosInstance.get(`/sms/stats/${phoneNumber}`);
  return response.data;
};

export const getSmsViolations = async (phoneNumber) => {
  const response = await axiosInstance.get(
    `/sms/stats/violations/${phoneNumber}`
  );
  return response.data;
};
