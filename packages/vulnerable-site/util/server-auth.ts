import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const serverSignOut = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("interbanc_access_token");
  redirect("/");
};
