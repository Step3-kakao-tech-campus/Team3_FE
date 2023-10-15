import client from "./instance";

interface RecordOptions {
  key?: number;
  size?: number;
  condition?: "all" | "created" | "participated";
  status?: "all" | "open" | "closed";
  cityId?: number;
  start?: string;
  end?: string;
}

export default async function getParticipationRecord(userId: number, recordOptions: RecordOptions) {
  const response = await client.get(`/api/posts/users/${userId}/participation-records`, { params: recordOptions });
  return response;
}
