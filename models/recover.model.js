import mongoose from 'mongoose'


const RecoverSchema = new mongoose.Schema(
    {
        ownerName:{
            type: String,
            required: true,
        },
        ownerEmail:{
            type: String,
            required: true,
        },
        postTitle:{
            type: String,
            required: true,
        },
        location:{
            type: String,
            required: true,
        },
        postId:{
            type: String,
            required: true,
        },
        postLostDate:{
            type: Date,
            required: true,
        },
        recoverDate:{
            type: Date,
            required: true
        }
    },
    {timestamps: true}
)

const RecoverModel = mongoose.model('Recover', RecoverSchema)

export { RecoverModel }