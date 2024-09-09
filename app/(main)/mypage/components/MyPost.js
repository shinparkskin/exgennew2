"use client";

import * as React from "react";
import { Button, Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import Posts from './posts'
import { cn } from "./cn";

export default function MyQueries() {
  return (
    <div className="p-2">
      {/* Full name */}
      <Posts></Posts>
    </div>
  );
}
