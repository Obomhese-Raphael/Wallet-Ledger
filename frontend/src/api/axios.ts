import axios from "axios";

export const api = axios.create({
  baseURL: "https://wallet-ledger-api-8icr.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
