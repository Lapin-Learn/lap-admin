import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/services/users";

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
