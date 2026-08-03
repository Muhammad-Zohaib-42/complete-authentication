import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const RegisterForm = () => {
  const {register, handleSubmit, formState: {isLoading, errors}} = useForm()

  const {loading, error, registerUser} = useAuth()

  async function submitHandler(data) {
    console.log(data)
    await registerUser(data)
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="p-6 bg-gray-800 rounded-xl flex flex-col gap-3 w-82.5 shadow-2xl">
        <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input className="border-none outline-none px-3 py-2 rounded-lg bg-slate-900 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-slate-800" type="name" id="name" placeholder="Enter name" {...register("name", {required: true})} />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input className="border-none outline-none px-3 py-2 rounded-lg bg-slate-900 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-slate-800" type="email" id="email" placeholder="Enter email" {...register("email", {required: true})} />
        </div>
        <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input className="border-none outline-none px-3 py-2 rounded-lg bg-slate-900 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-slate-800" type="password" id="password" placeholder="Enter password" {...register("password", {required: true})} />
        </div>
        <p>Already have an account! <Link to="/login" className="text-blue-400 transition-all hover:text-blue-600 border-none outline-none focus:text-blue-600 focus:underline hover:underline">Login</Link></p>
        <button className="border-none outline-none px-3 py-1.5 rounded-lg bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all focus:bg-blue-800">Register</button>
    </form>
  );
};

export default RegisterForm;
