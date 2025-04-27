import LogoutButton from './LogoutButton';

const NavBar = () => {
  return (
    <nav className='rounded-lg py-1.5 my-3 sticky top-0 z-10 bg-[#f6f6f6] dark:bg-[#1b1b1b]'>
        <ul className='flex flex-row justify-between items-center m-2 mx-6'>
            <li><a href="#widgets" className='a-nav'>Widgets</a></li>
            <li><a href="#bars" className='a-nav'>Progress</a></li>
            <li><a href="#" className='a-nav'>Button 3</a></li>
            <li><LogoutButton /></li>
        </ul>
    </nav>
  )
}

export default NavBar
