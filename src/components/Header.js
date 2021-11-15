import React from 'react'
import { Link } from 'gatsby'
import NavBar from './NavBar'
import Hamburger from './Hamburger'

function Header({ title }) {
  const menuLinks = [
    {
      Text: 'Project-Blog',
      to: `/project-blog`,
    },
    {
      Text: 'Blog',
      to: `/blog`,
    },
    {
      Text: 'Second-Brain',
      to: "https://brain.dustinfirebaugh.com/"
    },
    {
      Text: 'About',
      to: `/about`,
    },
    {
      Text: 'Mailing-List',
      to: `/mailing_list`,
    },
  ]
  return (
    <header
      style={{
        fontFamily: `Montserrat, sans-serif`,
        background: `rebeccapurple`,
      }}
    >
      <Hamburger menuLinks={menuLinks} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          display: `flex`,
          alignItems: `center`,
        }}
      >
        <h1
          style={{
            padding: `1.45rem 1.0875rem`,
            margin: 0,
          }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              boxShadow: `none`,
              textDecoration: `none`,
            }}
          >
            {title}
          </Link>
        </h1>
        <NavBar menuLinks={menuLinks} />
      </div>
    </header>
  )
}

export default Header
