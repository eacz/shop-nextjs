import { Box, Button } from '@mui/material'
import { ISize } from '../../interfaces/product'

interface Props {
  selectedSize?: ISize
  sizes: ISize[]

  onSelectedSize: (size: ISize) => void
}

const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size='small'
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}

export default SizeSelector
