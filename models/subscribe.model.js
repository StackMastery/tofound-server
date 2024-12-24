import mongoose from 'mongoose'


const SubscribeSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            maxlength: 255,
            unique: true,
        }
    },
    {timestamps: true}
)

const SubscribeModel = mongoose.model('user', SubscribeSchema)

export { SubscribeModel }