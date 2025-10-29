export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Protected Dashboard</h1>
      <p className="text-gray-600 mt-2">You can only see this if logged in.</p>
    </div>
  );
}
