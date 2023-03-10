import { IProduct } from '@/interfaces'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

interface Props {
  product: IProduct
}

const Product = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`
  }, [isHovered, product.images])

  return (
    <Grid item xs={6} sm={4} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink href='/products/slug' passHref prefetch={false}>
          <CardActionArea>
            <CardMedia className='fadeIn' component='img' image={productImage} alt={product.title} />
          </CardActionArea>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  )
}

export default Product
