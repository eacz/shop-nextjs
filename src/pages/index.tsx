import { initialData } from '@/database/products'
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import { ShopLayout } from '../components/layouts'

export default function Home() {
  return (
    <ShopLayout title='Teslo-Shop - Home' pageDescription='Find the best Teslo Products'>
      <Typography variant='h1' component='h1'>
        Teslo Shop
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All the products
      </Typography>
      <Grid container spacing={4}>
        {initialData.products.map((product) => (
          <Grid item xs={6} sm={4} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia component='img' image={`products/${product.images[0]}`} alt={product.title} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  )
}
