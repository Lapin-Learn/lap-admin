import { Button } from "@components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import { IUser } from "@/lib/interfaces";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "email",
    header: "Account",
    cell: ({ row }) => {
      const { email, fullName } = row.original;
      return (
        <div>
          <Typography variant="subtitle2">{fullName ?? "--"}</Typography>
          <Typography variant="caption" className="text-muted-foreground">
            {email}
          </Typography>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <p className="capitalize">{row.original.role}</p>,
  },
  {
    accessorKey: "dob",
    header: "Day of birth",
    cell: ({ row }) => (row.original.dob ? dayjs(row.original.dob).format("DD/MM/YY") : "--"),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) =>
      row.original.gender ? <p className="capitalize">{row.original.gender}</p> : "--",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => dayjs(row.original.createdAt).format("DD/MM/YY"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="inline-flex w-full flex-row justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0 data-[state=open]:opacity-100">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to={`${row.original.id}`}>
                <DropdownMenuItem>View user detail</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
