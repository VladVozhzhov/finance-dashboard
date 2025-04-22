import LogoutButton from './LogoutButton';

const NavBar = () => {
  return (
    <nav className='border rounded-lg my-3 '>
        <ul className='flex flex-row justify-between items-center m-2 mx-6'>
            <li><a href="#widgets" className='a-nav'>Widgets</a></li>
            <li><a href="#" className='a-nav'>Button 2</a></li>
            <li><a href="#" className='a-nav'>Button 3</a></li>
            <li><LogoutButton /></li>
        </ul>
    </nav>
  )
}

export default NavBar
