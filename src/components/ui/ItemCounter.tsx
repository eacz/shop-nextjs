import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

interface Props {
  currentValue: number
  maxValue: number
  onQuantityChange: (quantity: number) => void
}

const ItemCounter = ({ currentValue, maxValue, onQuantityChange }: Props) => {
  const handleQuantityChange = (amount: number) => {
    const newValue = currentValue + amount
    if (newValue > maxValue) {
      onQuantityChange(maxValue)
    } else if (newValue < 1) {
      onQuantityChange(1)
    } else {
      onQuantityChange(newValue)
    }
  }

  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={() => handleQuantityChange(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
      <IconButton onClick={() => handleQuantityChange(1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter
