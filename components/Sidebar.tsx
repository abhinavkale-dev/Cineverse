import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static left-0 top-0 w-[70%] lg:w-[20%] h-full border-r border-zinc-800 p-10 flex flex-col bg-black transition-transform duration-300 ease-in-out z-50`}>
      <i onClick={() => setIsOpen(false)} className="ri-close-line absolute right-4 top-4 text-2xl cursor-pointer lg:hidden"></i>
        <h1 className="text-2xl font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span>
          Cineverse
        </span>
        </h1>

        <nav className="flex flex-col text-zinc-400 text-xl">
            <h1 className="text-white font-semibold text-xl mt-10 mb-5">Feed</h1>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="/movies">
            <i className="mr-2 ri-movie-2-fill"></i> Movies
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="/tv-shows">
            <i className="mr-2 ri-tv-2-fill"></i> TV Shows
            </Link>
        </nav>

        <hr className="border-none h-[1px] bg-zinc-400"/>
         
        <nav className="flex flex-col text-zinc-400 text-xl">
            <h1 className="text-white font-semibold text-xl mt-6 mb-5">Menu</h1>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="/profile">
            <i className="mr-2 ri-user-3-fill"></i> Profile
            </Link>
            <Link className="hover:bg-[#6556CD] hover:text-white rounded-lg p-5 duration-300" href="">
            <i className="mr-2 ri-information-fill"></i> About
            </Link>
        </nav>
    </div>
  )
}

export default Sidebar 