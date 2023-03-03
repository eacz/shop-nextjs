import { IProduct } from '@/interfaces'
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
        <CardActionArea>
          <CardMedia  className='fadeIn' component='img' image={productImage} alt={product.title} />
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>${product.price}</Typography>
      </Box>
    </Grid>
  )
}

export default Product