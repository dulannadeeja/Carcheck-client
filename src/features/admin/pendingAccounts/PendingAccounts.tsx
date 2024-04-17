import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AccountType } from "../../authentication/auth";
import { cn } from "../../../utils/mergeClasses";
import Note from "./components/Note";
import Approve from "./components/Approve";
import { RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { loadPendingAccounts } from "./pendingAccountsSlice";
import Button from "../../../components/ui/Button";

const userData: TData[] = [
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja1@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja2@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja3@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
  {
    firstName: "dulan",
    lastName: "nadeeja",
    accountType: AccountType.sellerPersonal as string,
    email: "dulannadeeja4@gmail.com",
    status: "pending",
    note: "",
  },
];

export type TData = {
  firstName: string;
  lastName: string;
  accountType: string;
  email: string;
  status: string;
  note: string;
};

const columnHelper = createColumnHelper<TData>();

const columns = [
  columnHelper.accessor("firstName", {
    header: () => "First name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: () => "Last name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("accountType", {
    header: () => "Type of account",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => "Business email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("note", {
    header: () => "Note on account",
    cell: (info) => <Note {...info} />,
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    id: "approve",
    header: () => "Approve",
    cell: (info) => <Approve {...info} />,
  }),
];

function PendingAccounts() {
  const dispatch = useDispatch();
  const { pendingAccounts } = useSelector(
    (state: RootState) => state.pendingAccounts
  );

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (pendingAccounts.length === 0) {
      dispatch(loadPendingAccounts(userData));
    }
  }, [dispatch, pendingAccounts.length]);

  const table = useReactTable({
    data: pendingAccounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    // autoResetAll: true,
  });

  console.log(pendingAccounts);

  return (
    <div>
      <table
        className="border border-gray-200 border-solid overflow-hidden"
        width={table.getTotalSize()}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="flex divide-x divide-gray-300 border-b border-b-gray-200 "
            >
              {headerGroup.headers.map((header) => (
                <th
                  className="flex justify-between p-0 group"
                  style={{ width: header.getSize() }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={cn(
                      "bg-blue-300 w-1 h-full opacity-0 group-hover:opacity-100 cursor-col-resize",
                      {
                        "bg-green-600": header.column.getIsResizing(),
                      }
                    )}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="flex divide-x divide-gray-300 border-b border-b-gray-200 "
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className="overflow-hidden"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div>
          <button
            onClick={() => setPageIndex((old) => old - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            onClick={() => setPageIndex((old) => old + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <div>
            Go to page:
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                setPageIndex(page);
              }}
              style={{ width: "50px" }}
            />
          </div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={() => console.log(pendingAccounts)}>Log data</button>
    </div>
  );
}

export default PendingAccounts;
