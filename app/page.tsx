"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("CC_token");
    if (!token) {
      router.push("/Login");
    } else {
      router.push("/Dashboard");
    }
  }, []);
}
