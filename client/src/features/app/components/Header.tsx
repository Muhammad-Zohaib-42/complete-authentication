const Header = () => {
  return (
    <header className="bg-gray-900 flex items-center justify-between px-10 py-5 text-gray-200">
        <h1 className="text-xl font-semibold">WebDevKing</h1>
        <div className="h-9 aspect-square rounded-full bg-gray-700 flex items-center justify-center font-bold relative group">
            <span>Z</span>
            <div className="pt-3 absolute top-[90%] right-0 hidden transition-all group-hover:block">
                <div className="bg-slate-800 rounded-lg p-2 w-32 shadow-2xl">
                    <button className="py-1.5 transition-all hover:bg-slate-700 w-full rounded-md cursor-pointer font-normal text-left px-4">Logout</button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header