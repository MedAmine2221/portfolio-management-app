"use client";

import type { SVGProps } from "react";
import type { Selection, SortDescriptor } from "@heroui/react";

import React from "react";
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
  Pagination,
} from "@heroui/react";

import { NameAbreviation } from "@/lib/utils";
import { AppUser } from "@/types";

/* ================= ICONS ================= */

export type IconSvgProps = SVGProps<SVGSVGElement> & { size?: number };

export const SearchIcon = (props: IconSvgProps) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path
      d="M11.5 21C16.7 21 21 16.7 21 11.5S16.7 2 11.5 2 2 6.3 2 11.5 6.3 21 11.5 21Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M22 22L20 20" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const ChevronDownIcon = (props: IconSvgProps) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <path d="m19 9-7 7-7-7" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const VerticalDotsIcon = (props: IconSvgProps) => (
  <svg height="1em" viewBox="0 0 24 24" width="1em" {...props}>
    <circle cx="12" cy="5" fill="currentColor" r="2" />
    <circle cx="12" cy="12" fill="currentColor" r="2" />
    <circle cx="12" cy="19" fill="currentColor" r="2" />
  </svg>
);

const columns = [
  { name: "", uid: "" },
  { name: "FIRSTNAME", uid: "firstName", sortable: true },
  { name: "LASTNAME", uid: "lastName", sortable: true },
  { name: "EMAIL", uid: "email", sortable: false },
  { name: "OBJECT", uid: "object", sortable: false },
  { name: "MESSAGE", uid: "message", sortable: false },
  { name: "CREATED", uid: "createdAt", sortable: true },
  { name: "PROGRESS", uid: "progress", sortable: false },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "email",
  "object",
  "createdAt",
  "progress",
  "actions",
  "",
];

/* ================= COMPONENT ================= */

export default function AppTables({ data }: { data: AppUser[] }) {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set());
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "lastName",
    direction: "ascending",
  });

  /* ========== FILTER ========== */

  const filteredItems = React.useMemo(() => {
    return data.filter((user) =>
      user.firstName.toLowerCase().includes(filterValue.toLowerCase()),
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
      case "":
        return (
          <div className="mr-4 rounded-full bg-default-100 border border-default-300 w-10 h-10 flex justify-center items-center">
            <p className="mx-2 text-xl font-bold text-default-600">
              {NameAbreviation(user.lastName, user.firstName)}
            </p>
          </div>
        );
      case "firstName":
        return user.firstName || "—";

      case "lastName":
        return user.lastName || "—";

      case "email":
        return user.email || "—";

      case "object":
        return user.object || "—";

      case "message":
        return user.message || "—";

      case "createdAt":
        return user.createdAt || "—";

      case "progress":
        return (
          <Chip
            color={
              user.progress === "to do"
                ? "danger"
                : user.progress === "in progress"
                  ? "warning"
                  : "success"
            }
            size="sm"
            variant="flat"
          >
            {user.progress}
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

    return columns.filter((c) => Array.from(visibleColumns).includes(c.uid));
  }, [visibleColumns]);

  /* ================= RENDER ================= */
  return (
    <Table
      isHeaderSticky
      aria-label="Users table"
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
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={
        <div className="flex justify-between gap-3">
          <Input
            isClearable
            className="max-w-xs"
            placeholder="Search last name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => setFilterValue("")}
            onValueChange={setFilterValue}
          />

          <Dropdown>
            <DropdownTrigger>
              <Button endContent={<ChevronDownIcon />} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((col) => (
                <DropdownItem key={col.uid}>{col.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      }
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent="No users found" items={sortedItems}>
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
