// import Button from "./components/ui/Button";
// import Card from "./components/ui/Card";
// import Input from "./components/ui/Input";
// import Logo from "./components/ui/Logo";

// export default function App() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <Card>
//         <div className="space-y-6 w-96">
//           <Logo />

//           <Input label="Email" placeholder="Enter your email" />

//           <Input label="Password" type="password" placeholder="Enter your password" />

//           <Button>Login</Button>
//         </div>
//       </Card>
//     </div>
//   );
// }

import Login from "./pages/auth/Login";

export default function App() {
  return <Login />;
}