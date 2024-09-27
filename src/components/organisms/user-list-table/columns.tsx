import { ColumnDef } from "@tanstack/react-table";
import { IUser } from "@/lib/interfaces";
import { Typography } from "@/components/ui/typography";
import dayjs from "dayjs";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "email",
    header: "Account",
    cell: ({ row }) => {
      const { email, fullName } = row.original;
      return (
        <div>
          <Typography variant="subtitle2">{fullName}</Typography>
          <Typography variant="caption" className="text-muted-foreground">
            {email}
          </Typography>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "learnerProfile.rank",
    header: "Rank",
    cell: ({ row }) => {
      const { learnerProfile } = row.original;
      return (
        <Typography className="capitalize" variant="body2">
          {learnerProfile?.rank}
        </Typography>
      );
    },
  },
  {
    accessorKey: "learnerProfile.levelId",
    header: "Level",
  },
  {
    accessorKey: "learnerProfile.xp",
    header: "Experience",
  },
  {
    accessorKey: "learnerProfile.carrots",
    header: "Carrots",
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
