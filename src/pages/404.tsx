import { ShopLayout } from '@/components/layouts'
import { Box, Typography } from '@mui/material'

const Page404 = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='Nothing to see here'>
      <Box
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
      >
        <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}>
          404
        </Typography>
        <Typography
          variant='h1'
          sx={{ display: { xs: 'none', md: 'block' } }}
          component='span'
          fontSize={80}
          fontWeight={200}
        >
          |
        </Typography>
        <Typography marginLeft={0}>This page doesn&apos;t exists</Typography>
      </Box>
    </ShopLayout>
  )
}

export default Page404
