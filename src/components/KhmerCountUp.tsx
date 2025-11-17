// components/KhmerCountUp.tsx
"use client";

import { toKhmer } from "@/app/utils/khmerNumbers";
import CountUp from "react-countup";

interface Props {
  end: number;
  duration?: number;
}

export default function KhmerCountUp({ end, duration = 2 }: Props) {
  return (
    <CountUp
      end={end}
      duration={duration}
      formattingFn={(value: number) => toKhmer(value)}
    />
  );
}
