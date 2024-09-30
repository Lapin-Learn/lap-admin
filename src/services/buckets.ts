import ky from "ky";

import { IBucket } from "@/lib/interfaces";
import { FetchingData } from "@/lib/types/pagination";

import api from "./kyInstance";

export const getFile = async (id: string) => {
  return (await api.get(`files/${id}`).json<FetchingData<IBucket>>()).data;
};

interface IPresignedURL {
  id: string;
  url: string;
}

export const createPresignedURL = async (params: { name: string }) => {
  return (
    await api.post("files/presigned-url", { json: params }).json<FetchingData<IPresignedURL>>()
  ).data;
};

type BucketInfo = {
  id: string;
  name: string;
};

export const updatePresignedURL = async ({ id, name }: BucketInfo) => {
  return (
    await api
      .put(`files/presigned-url/${id}`, { json: { name } })
      .json<FetchingData<IPresignedURL>>()
  ).data;
};

export const confirmUpload = async (params: { id: string }) => {
  return (await api.post("files/confirmation", { json: params }).json<FetchingData<BucketInfo>>())
    .data;
};

export const deleteFile = async (id: string) => {
  return await api.delete(`files/${id}`).json();
};

export const uploadFileToCloud = async ({ file, url }: { file: File; url: string }) => {
  const arrayBuffer = await file.arrayBuffer();
  const kyInstance = ky.create({});
  await kyInstance.put(url, { body: arrayBuffer, headers: { "Content-Type": file.type } });
};
