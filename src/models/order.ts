import mongoose, { Model, model, Schema } from 'mongoose'
import { IOrder } from '@/interfaces'

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      zipcode: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true },
    },

    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    numberOfItems: { type: Number, required: true },

    paymentResult: { type: String },
    paidAt: { type: String },
    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
)

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema)

export default Order
