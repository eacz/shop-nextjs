import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { AppBar, Badge, Button, IconButton, Link, Toolbar, Typography, Box } from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

const noUnderline = { textDecoration: 'none' }

const Navbar = () => {
  const { pathname } = useRouter()

  const pathCategory = pathname.split('/')[2]

  return (
    <AppBar>
      <Toolbar>
        <NextLink style={noUnderline} href='/' passHref>
          <Link display='flex' alignItems='center' component='span'>
            <Typography variant='h6'>Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink style={noUnderline} href='/category/men' passHref>
            <Link component='span'>
              <Button color={pathCategory === 'men' ? 'primary' : 'info'}>Men</Button>
            </Link>
          </NextLink>
          <NextLink style={noUnderline} href='/category/women' passHref>
            <Link component='span'>
              <Button color={pathCategory === 'women' ? 'primary' : 'info'}>Women</Button>
            </Link>
          </NextLink>
          <NextLink style={noUnderline} href='/category/kid' passHref>
            <Link component='span'>
              <Button color={pathCategory === 'kid' ? 'primary' : 'info'}>Kid</Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined></ShoppingCartOutlined>
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
