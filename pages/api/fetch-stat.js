/* eslint-disable no-console */
import axios from "axios";

const cloud = axios.create({
  baseURL: process.env.CLOUD_URL
});

const CLOUD_API = process.env.CLOUD_API;

export const fetchKeyStat = async(symbol) => {
  try {
    if (!symbol) return null;

    const response = await cloud.get(`/stock/${symbol}/stats/5?token=${CLOUD_API}`);
    return response.data;
  } catch (error) {
    console.error("[err] fetch key stat : ", error.response);
    return null;
  }
};

export const fetchPrevPrice = async(symbol) => {
  try {
    if (!symbol) return null;
    
    const response = await cloud.get(`/stock/${symbol}/previous?token=${CLOUD_API}`);
    return response.data;
  } catch (error) {
    console.error("fetch privious price : ", error.response);
    return null;

  }
};

export const fetchHistory = async(symbol, time="1m") => {
  try {
    if (!symbol) return null;
    
    const response = await cloud.get(`/stock/${symbol}/chart/${time}?token=${CLOUD_API}`);
    return response.data;
  } catch (error) {
    console.error("fetch history : ", error.response);
    return null;
  }
};

export const fetchCompany = async(symbol) => {
  try {
    if (!symbol) return null;
    
    const response = await cloud.get(`/stock/${symbol}/company?token=${CLOUD_API}`);
    return response.data;
  } catch (error) {
    console.error("fetch company : ", error.response);
    return null;
  }
};

export const fetchNews = async symbol => {
  try {
    if (!symbol) return null;
    
    const response = await cloud.get(`/stock/${symbol}/news?token=${CLOUD_API}`);
    return response.data;
  } catch (error) {
    console.error("fetch news : ", error.response);
    return null;
  }
};

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const { symbol } = req.query;
      if (!symbol) return res.json({
        success: false,
        data: {}
      });

      console.log("symbol", symbol);

      const stat = await fetchKeyStat(symbol);
      const prevPrice = await fetchPrevPrice(symbol);
      const company = await fetchCompany(symbol);

      return res.json({
        success: true,
        data: {
          stat,
          prevPrice,
          company,
        }
      });
    } catch (err) {
      console.log("fetch data stock err : ", err);

      return res.json({
        success: false,
        data: {}
      });
    }
  }
}