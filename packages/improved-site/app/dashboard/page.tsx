export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { email, name, avatar } = searchParams;
  const hasGoogle = Boolean(email && name && avatar);

  const user = { name: "John Doe" }; // TODO. get from token
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Bienvenido de vuelta {user.name}</h1>
      <p className="text-gray-600 mt-2">
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
        <form action="/api/google" method="POST" className="mt-4">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Conectar con Google
          </button>
        </form>
      )}
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Cerrar sesión
      </button>
    </div>
  );
}
