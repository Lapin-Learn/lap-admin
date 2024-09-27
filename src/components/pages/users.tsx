import { Users } from "lucide-react";

import { useGetUsers } from "@/hooks/react-query/useUsers";

import UserListTable from "../organisms/user-list-table";
import { Typography } from "../ui/typography";

export default function UserListPage() {
  const { data } = useGetUsers();
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <Typography variant="h3" className="inline-flex items-center">
          <Users size={24} className="mr-2 inline-block" />
          User list
        </Typography>
        {/* <Button onClick={() => navigate({ to: "create" })}>Create</Button> */}
      </div>
      {data && <UserListTable data={data.accounts} />}
    </div>
  );
}
