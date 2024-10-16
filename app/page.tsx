"use client";
import RegisterForm from "./components/RegisterForm";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full h-full">
        <RegisterForm />
      </div>
    </div>
  );
}
