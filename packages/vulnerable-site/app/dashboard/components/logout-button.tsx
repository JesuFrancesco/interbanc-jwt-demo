"use client";
import { clientSignOut } from "@/util/client-auth";

export const LogoutButton = () => (
  <button
    className="hover:cursor-pointer px-4 py-2 bg-red-500 text-white rounded"
    onClick={clientSignOut}
  >
    Cerrar sesión
  </button>
);
