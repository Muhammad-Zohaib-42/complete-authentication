import { Link } from "react-router-dom"

const LoginForm = () => {
  return (
    <form className="p-6 bg-gray-800 rounded-xl flex flex-col gap-3 w-82.5 shadow-2xl">
        <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input className="border-none outline-none px-3 py-2 rounded-lg bg-slate-900 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-slate-800" type="email" id="email" name="email" placeholder="Enter email" />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input className="border-none outline-none px-3 py-2 rounded-lg bg-slate-900 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-slate-800" type="password" id="password" name="password" placeholder="Enter password" />
        </div>
        <p>Don't have an account! <Link to="/register" className="text-blue-400 transition-all hover:text-blue-600 border-none outline-none focus:text-blue-600 focus:underline hover:underline">Register</Link></p>
        <button className="border-none outline-none px-3 py-1.5 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all focus:bg-blue-800">Login</button>
    </form>
  )
}

export default LoginForm