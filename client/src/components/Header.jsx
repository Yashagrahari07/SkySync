import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Sky</span>
                    <span className='text-slate-700'>Sync</span>
                </h1>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/weather'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>Weather</li>
                </Link>
                <Link to='/about'>
                    <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? (
                        <button className="flex gap-2">
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile" />
                            <span className='hidden sm:inline text-slate-700 uppercase'>{currentUser.username}</span>
                        </button>
                    ): (
                        <li className='text-slate-700 hover:underline'>Sign In</li>
                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
