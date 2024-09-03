import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { AppBar, Box, Container, IconButton, Paper, Toolbar } from '@mui/material'
import { Footer } from './footer'
import menuBar from '../../images/menu-bar.png'
import { useConfig } from '../../context'
import { Link } from '../link'

export const Layout = ({ children }) => {
  const { config } = useConfig()

  return (
    <Fragment>
      <Head>
        <title>RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image src={menuBar}></Image>
      <main style={{ flex: 1 }}>
        <Container maxWidth={ config.width }>
          { children }
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
