import RegisterForm from "../components/RegisterForm"

const Register = () => {
  return (
    <main className="bg-gray-900 text-gray-200 h-screen flex items-center justify-center">
        <h1 className="text-xl font-semibold fixed top-10 left-32">WebDevKing → Register</h1>
        <RegisterForm />
    </main>
  )
}

export default Register