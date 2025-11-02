import { getPayload } from "@/lib/jwt";
import { cookies } from "next/headers";
import { LogoutButton } from "./components/logout-button";
import interbancLogo from "@/public/interbanc.png";
import Image from "next/image";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { email, name, avatar } = await searchParams;
  const hasGoogle = Boolean(email && name && avatar);

  const cookieStore = await cookies();
  const jwt = cookieStore.get("interbanc_access_token")?.value;
  const payload = getPayload(jwt!);
  const { documentNumber } = payload;

  return (
    <div className="flex flex-col gap-y-4 items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">
        Bienvenido de vuelta {documentNumber as string}
      </h1>

      <Image
        src={interbancLogo}
        alt="Interbanc Logo"
        className="w-32 h-32 rounded-2xl hover:scale-105 transition-transform"
      />

      <p className="text-gray-600">
        Solo puedes ver esto si has iniciado sesión.
      </p>
      {hasGoogle ? (
        <article className="border-4 border-white rounded-2xl p-4 justify-center ">
          <h2 className="text-xl font-semibold">Información de Google</h2>
          <div className="flex flex-row justify-around gap-x-4 items-center">
            <img
              src={avatar as string}
              alt="Avatar"
              className="mt-2 w-16 h-16 rounded-full"
            />
            <div>
              <p className="mt-2">Nombre: {name}</p>
              <p className="mt-2">Email: {email}</p>
            </div>
          </div>
        </article>
      ) : (
        <form action="/api/google" method="POST">
          <button className="hover:cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">
            Conectar con Google
          </button>
        </form>
      )}
      <LogoutButton />
    </div>
  );
}
