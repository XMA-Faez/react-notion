"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  // Redirect to dashboard page
  useEffect(() => {
    router.push("/dashboard");
  }, [router]);
  
  return null;
}