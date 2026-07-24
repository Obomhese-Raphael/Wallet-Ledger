import { useAuth } from "../../context/AuthContext";

export default function Greeting() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">
          {greeting}, <span className="text-indigo-600">{user?.firstName}</span>
          👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's everything happening with your wallet today.
        </p>
      </div>
    </div>
  );
}
