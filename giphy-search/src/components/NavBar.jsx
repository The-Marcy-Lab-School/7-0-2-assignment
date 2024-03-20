const colors = {
  black: 'navbar-inverse',
  white: 'navbar-default'
}

function NavBar({ color, title }) {
  return (
    <nav className={`navbar ${colors[color]}`}>
      <div className='container-fluid'>
        <div className='navbar-header'>
          <div className='navbar-brand'>
            {title}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
