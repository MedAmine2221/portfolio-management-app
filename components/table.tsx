"use client";;
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
  Pagination,
} from "@heroui/react";

import { AppUser } from "@/types";
import { columns, INITIAL_VISIBLE_COLUMNS } from "@/constants";
import { SearchIcon } from "./app/user-table/searchIcon";
import { ChevronDownIcon } from "./app/user-table/chevronDownIcon";
import { renderCell } from "./app/user-table/renderCell";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AppTables({ data }: { data: AppUser[] }) { 
  const dispatch = useDispatch();
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
  const filteredItems = React.useMemo(() => {
    return data.filter((user) =>
      user.firstName?.toLowerCase().includes(filterValue.toLowerCase()),
    );
  }, [data, filterValue]);

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
          <TableColumn   className={column.uid === "status" ? "text-center" : ""} key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent="No users found" items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(dispatch, item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
