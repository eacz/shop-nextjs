import { useContext, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Box,
  Input,
  InputAdornment,
} from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

import { CartContext, UiContext } from '@/context'

const noUnderline = { textDecoration: 'none' }

const Navbar = () => {
  const { pathname, push } = useRouter()

  const { toggleMenu } = useContext(UiContext)
  const {
    cartSummary: { numberOfItems },
  } = useContext(CartContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const pathCategory = pathname.split('/')[2]

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
  }

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

        <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }}>
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

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            autoFocus
            type='text'
            placeholder='Buscar...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearchTerm()}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className='fadeIn'
            onClick={() => setIsSearchVisible(true)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Small Screen */}
        <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleMenu}>
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart' passHref>
          <Link component='span'>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                <ShoppingCartOutlined></ShoppingCartOutlined>
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
