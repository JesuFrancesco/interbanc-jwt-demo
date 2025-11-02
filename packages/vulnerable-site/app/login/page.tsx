"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import paracasBG from "@/public/paracas-bg-hd.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InterbankLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDocument, setRememberDocument] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };

    try {
      verifyUser();
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ documentNumber, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);

    if (res.ok) router.push("/dashboard");
    else alert("Credenciales incorrectas");
    // else {
    //   const data = await res.json()
    //   alert(data.error);
    // }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}

      <Image
        className="h-screen bg-container bg-no-repeat bg-top"
        src={paracasBG}
        alt="no hay bg"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent" />

      {/* Logo */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded" />
        <span className="text-white text-2xl font-bold">
          Interbanc 🗣️🗣️🗣️🗣️
        </span>
      </div>

      {/* Form Card */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Document Type and Number */}
            <div className="space-y-2">
              <div className="flex gap-3">
                <select
                  aria-readonly
                  defaultValue={"DNI"}
                  className="w-24 px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>DNI</option>
                  {/* <option>RUC</option>
                  <option>CE</option> */}
                </select>
                <input
                  type="text"
                  placeholder="Número de documento"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Document Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDocument}
                onChange={(e) => setRememberDocument(e.target.checked)}
                className="w-4 h-4 border border-gray-300 rounded cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Recordar documento
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Siguiente
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="bg-green-900 text-white text-sm py-3 px-6 rounded-b-lg flex gap-4 justify-center">
          <a href="#" className="hover:underline">
            Regístrate
          </a>
          <span className="text-green-700">|</span>
          <a href="#" className="hover:underline">
            Olvidé mi contraseña
          </a>
          <span className="text-green-700">|</span>
          <a href="#" className="hover:underline">
            Ayuda
          </a>
        </div>
      </div>
    </div>
  );
}
