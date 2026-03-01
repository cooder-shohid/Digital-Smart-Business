export default function Register() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-96 p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input className="input" placeholder="Name" />
        <input className="input mt-2" placeholder="Email" />
        <input className="input mt-2" placeholder="Password" type="password" />
        <button className="mt-4 bg-orange-500 text-white w-full py-2 rounded">
          Create Account
        </button>
      </div>
    </div>
  );
}