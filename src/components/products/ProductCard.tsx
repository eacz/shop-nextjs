import { useMemo, useState } from 'react'
import NextLink from 'next/link'
import { Grid, Card, CardActionArea, CardMedia, Box, Typography, Chip } from '@mui/material'

import { IProduct } from '@/interfaces'

interface Props {
  product: IProduct
}

const Product = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const productImage = useMemo(() => {
    return isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`
  }, [isHovered, product.images])

  return (
    <Grid item xs={6} sm={4} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Card>
        <NextLink href={`/products/${product.slug}`} passHref prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color='primary'
                sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                label='Out of stock'
              />
            )}
            <CardMedia
              className='fadeIn'
              component='img'
              image={productImage}
              alt={product.title}
              onLoad={() => setIsImageLoaded(true)}
            />
          </CardActionArea>
        </NextLink>
      </Card>
      <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  )
}

export default Product
