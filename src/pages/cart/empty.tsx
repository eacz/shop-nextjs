import NextLink from 'next/link'
import { Box, Link, Typography } from '@mui/material'
import { ShopLayout } from '@/components/layouts'
import { RemoveShoppingCartOutlined } from '@mui/icons-material'

const EmptyPage = () => {
  return (
    <ShopLayout title='Empty Shop Cart' pageDescription='There is no products on the shop car'>
      <Box
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography marginLeft={2}>Your Shop Cart is empty</Typography>
          <NextLink href='/' passHref style={{ textDecoration: 'none' }}>
            <Link typography='h4' component='span' color='secondary'>
              Go Back Home
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  )
}

export default EmptyPage
