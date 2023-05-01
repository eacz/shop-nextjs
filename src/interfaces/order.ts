import { Address, IUser, OrderSummary } from '.'

export interface IOrder extends OrderSummary {
  _id?: string
  user?: IUser | string
  orderItems: IOrderItem[]
  address: Address
  paymentResult?: string
  isPaid: boolean
  paidAt?: string
}

export interface IOrderItem {
  _id: string
  title: string
  size: string
  slug: string
  image: string
  price: number
  quantity: number
}
