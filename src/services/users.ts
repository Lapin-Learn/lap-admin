import { FetchingData, PagedData } from "@/lib/types/pagination";
import api from "./kyInstance";
import { IUser } from "@/lib/interfaces";

export const getUsers = async () => {
  return (await api.get("users").json<FetchingData<PagedData<IUser, "accounts">>>()).data;
};
