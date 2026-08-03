import LoginForm from "../components/LoginForm"

const Login = () => {
  return (
    <main className="bg-gray-900 text-gray-200 h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold fixed top-10 left-32">WebDevKing → Login</h1>
        <LoginForm />
    </main>
  )
}

export default Login