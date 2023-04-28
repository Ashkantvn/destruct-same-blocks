import React from 'react'

const Header = () => {
  const refreshPage = ()=>{
    window.location.reload();
  }
  return (
    <header>
      <button onClick={refreshPage} className='start-newgame'>New game</button>
    </header>
  )
}

export default Header;