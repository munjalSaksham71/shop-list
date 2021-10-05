import mongoose from 'mongoose'

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    openingDate: {
        type: Date,
        required: true
    },
    closingDate: {
        type: Date,
        required: true
    }
})
const Shop = mongoose.model('Shop', shopSchema)

export default Shop