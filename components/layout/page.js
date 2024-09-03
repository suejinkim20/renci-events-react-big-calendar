import { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { Divider, Typography } from '@mui/material'

export const Page = ({
  title,
  hideTitle,
  superheader,
  superheaderUrl,
  description,
  children,
  heroImage,
}) => {
  const windowTitle = `${ title + ' | ' || '' } RENCI.org`
  return (
    <Fragment>
      <Head>
        <title> { title } | RENCI.org</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Fragment>
      <br /><br />

        <Typography variant="h1">
          { title }
        </Typography>
        <br /><br />
        <Divider />
        <br /><br />
      </Fragment>


      { children }
      
    </Fragment>
  )
}

Page.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  superheader: PropTypes.string,
  superheader: PropTypes.string,
  description: PropTypes.string,  
}

Page.defaultProps = {
  hideTitle: false,
}
