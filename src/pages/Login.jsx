export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email" />
        <input className="input mt-2" placeholder="Password" type="password" />
        <button className="mt-4 bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}