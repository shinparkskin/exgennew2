"use client";

import * as React from "react";
import { Button, Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import Queries from './queries'
import { cn } from "./cn";

const timeZoneOptions = [
  {
    label: "Coordinated Universal Time (UTC-3)",
    value: "utc-3",
    description: "Coordinated Universal Time (UTC-3)",
  },
  {
    label: "Coordinated Universal Time (UTC-4)",
    value: "utc-4",
    description: "Coordinated Universal Time (UTC-4)",
  },
  {
    label: "Coordinated Universal Time (UTC-5)",
    value: "utc-5",
    description: "Coordinated Universal Time (UTC-5)",
  },
];

export default function MyQueries() {
  return (
    <div className="p-2">
      {/* Full name */}
      <Queries></Queries>
    </div>
  );
}
