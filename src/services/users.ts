import { IUser } from "@/lib/interfaces";
import { FetchingData, PagedData } from "@/lib/types/pagination";

import api from "./kyInstance";

export const getUsers = async () => {
  return (await api.get("users").json<FetchingData<PagedData<IUser, "accounts">>>()).data;
};
