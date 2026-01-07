"use client";

import React from "react";
import type { SVGProps } from "react";
import type { Selection, SortDescriptor } from "@heroui/react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";

/* ================= ICONS ================= */

export type IconSvgProps = SVGProps<SVGSVGElement> & { size?: number };

export const SearchIcon = (props: IconSvgProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      d="M11.5 21C16.7 21 21 16.7 21 11.5S16.7 2 11.5 2 2 6.3 2 11.5 6.3 21 11.5 21Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ChevronDownIcon = (props: IconSvgProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <path
      d="m19 9-7 7-7-7"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
  </svg>
);

export const VerticalDotsIcon = (props: IconSvgProps) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" {...props}>
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
  </svg>
);

/* ================= TYPES ================= */

type AppUser = {
  id: string;
  username: string;
  phoneNumber: string;
  lang: string;
  imageUrl: string;
  freePeriod: number;
  createdAt: string;
  address: string;
  goals: any[];
  validatedAccount: boolean;
};

/* ================= COLUMNS ================= */

const columns = [
  { name: "USERNAME", uid: "username", sortable: true },
  { name: "PHONE", uid: "phoneNumber", sortable: true },
  { name: "LANG", uid: "lang", sortable: true },
  { name: "FREE PERIOD", uid: "freePeriod", sortable: true },
  { name: "GOALS", uid: "goals" },
  { name: "CREATED", uid: "createdAt", sortable: true },
  { name: "VALIDATED", uid: "validatedAccount", sortable: true },
  // { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "username",
  "phoneNumber",
  "lang",
  "validatedAccount",
  // "actions",
];

/* ================= COMPONENT ================= */

export default function AppTables({ data }: { data: AppUser[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const [visibleColumns, setVisibleColumns] =
    React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] =
    React.useState<SortDescriptor>({
      column: "username",
      direction: "ascending",
    });

  /* ========== FILTER ========== */

  const filteredItems = React.useMemo(() => {
    return data.filter((user) =>
      user.username
        .toLowerCase()
        .includes(filterValue.toLowerCase())
    );
  }, [data, filterValue]);

  /* ========== PAGINATION ========== */

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  /* ========== SORT ========== */

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof AppUser];
      const second = b[sortDescriptor.column as keyof AppUser];
      if (first === second) return 0;
      const res = first > second ? 1 : -1;
      return sortDescriptor.direction === "descending" ? -res : res;
    });
  }, [items, sortDescriptor]);

  /* ========== RENDER CELL ========== */

  const renderCell = (user: AppUser, columnKey: React.Key) => {
    switch (columnKey) {
      case "username":
        return (
          <User
            name={user.username}
            description={user.lang}
            avatarProps={{ src: user.imageUrl || undefined }}
          />
        );

      case "phoneNumber":
        return user.phoneNumber || "—";

      case "freePeriod":
        return `${user.freePeriod} day(s) ago`;

      case "goals":
        return user.goals.length !== 0 ? user.goals.map((goal, index)=> index+1 + " - " + goal.name + "\n" ) : "—";

      case "validatedAccount":
        return (
          <Chip
            color={user.validatedAccount ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.validatedAccount ? "Validated" : "Not validated"}
          </Chip>
        );

      case "createdAt":
        return new Date(user.createdAt).toLocaleDateString();

      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <VerticalDotsIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete" className="text-danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );

      default:
        return user[columnKey as keyof AppUser] ?? "—";
    }
  };

  /* ========== HEADER COLUMNS ========== */

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((c) =>
      Array.from(visibleColumns).includes(c.uid)
    );
  }, [visibleColumns]);

  /* ================= RENDER ================= */
console.log(data);

  return (
    <Table
      aria-label="Users table"
      isHeaderSticky
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={
        <div className="flex justify-between gap-3">
          <Input
            isClearable
            placeholder="Search username..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
            className="max-w-xs"
          />

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="flat"
                endContent={<ChevronDownIcon />}
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              closeOnSelect={false}
              disallowEmptySelection
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((col) => (
                <DropdownItem key={col.uid}>
                  {col.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      }
      bottomContent={
        <div className="flex justify-between items-center px-2 py-2">
          <span className="text-sm text-default-400">
            {selectedKeys === "all"
              ? "All selected"
              : `${selectedKeys.size} selected`}
          </span>

          <div className="flex items-center gap-3">
            <label className="text-sm text-default-400">
              Rows:
              <select
                className="ml-2 bg-transparent outline-none"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </label>

            <Pagination
              isCompact
              showControls
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        </div>
      }
      classNames={{
        wrapper: "max-h-[420px] bg-white text-black",
      }}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={sortedItems} emptyContent="No users found">
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
