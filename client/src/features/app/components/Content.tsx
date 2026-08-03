import robot from "../../../assets/graident-ai-robot-vectorart_78370-4114-removebg-preview.png"

const Content = () => {
  return (
    <main>
        <section className="bg-gray-900 text-gray-200 flex flex-col items-center gap-2 py-15 h-[87.7vh]">
            <img src={robot} alt="robot image" className="w-40 animate-bounce" />
            <h1 className="text-3xl">Hey <span className="font-bold">Developer</span> 👋</h1>
            <h2 className="text-xl">Welcom To website</h2>
            <button className="px-5 py-1.5 bg-blue-600 transition hover:bg-blue-700 rounded-full text-white mt-3 font-medium cursor-pointer">Let's Talk</button>
        </section>
    </main>
  )
}

export default Content