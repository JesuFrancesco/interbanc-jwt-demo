"use client";
import React, { useEffect } from "react";

function DashboardGooglePage() {
  const getUserInfo = async (accessToken: string) => {
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) return null;
    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      const fragment = new URLSearchParams(window.location.hash.substring(1));

      const accessToken = fragment.get("access_token");

      if (accessToken) {
        const { email, name, picture } = await getUserInfo(accessToken);
        if (email && name && picture) {
          const redirectUrl = new URL("/dashboard", window.location.origin);
          redirectUrl.searchParams.set("email", email);
          redirectUrl.searchParams.set("name", name);
          redirectUrl.searchParams.set("avatar", picture);

          window.location.href = redirectUrl.toString();
        }
      } else {
        console.error("No access_token found in URL fragment");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen justify-center text-center ">
      Procesando información de Google...
    </div>
  );
}

export default DashboardGooglePage;
