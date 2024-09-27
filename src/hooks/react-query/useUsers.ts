import { getUsers } from "@/services/users";
import { useQuery } from "@tanstack/react-query";

const UserKeys = {
  key: ["users"],
  list: () => [...UserKeys.key, "list"],
};
export const useGetUsers = () => {
  return useQuery({
    queryKey: UserKeys.list(),
    queryFn: getUsers,
    staleTime: Infinity,
  });
};
