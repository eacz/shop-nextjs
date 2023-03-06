import { Box, Button } from '@mui/material'
import { ISize } from '../../interfaces/product'

interface Props {
  selectedSize?: ISize
  sizes: ISize[]
}

const SizeSelector = ({ selectedSize, sizes }: Props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size='small' color={selectedSize === size ? 'primary' : 'info'}>
          {size}
        </Button>
      ))}
    </Box>
  )
}

export default SizeSelector
