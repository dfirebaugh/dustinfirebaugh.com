import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import { rhythm } from '../utils/typography'

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author } = data.site.siteMetadata
        return (
          <div
            style={{
              display: `flex`,
              marginBottom: rhythm(2.5),
            }}
          >
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
              style={{
                marginRight: rhythm(1 / 2),
                marginBottom: 0,
                minWidth: 50,
                borderRadius: `100%`,
              }}
            />
            <p>
              Written by <strong>{author}</strong> of 
              Richmond, VA. He likes building software and helping people learn!
              <ul>
                <li>
                  <Link to={`https://paypal.me/DustinFirebaugh?locale.x=en_US`} >
                    buy me a coffee ☕
                  </Link>
                </li>
                <li>
                  <span>
                    send me ₿itcoin: bc1qeeshssgf59e96qqcc2lscqep7n3t35rkqpcda4
                  </span>
                </li>
                <li>
                  <Link  to={`/mailing_list`}>
                    sign up for the mailing list!
                  </Link>
                </li>
                <li>
                  Found a problem with this site? 
                  <Link to={`https://github.com/dfirebaugh/dustinfirebaugh.com/issues`}>
                    submit an issue here
                  </Link>
                </li>
              </ul>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`

export default Bio
