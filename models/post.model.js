import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        thumb:{
            type: String, 
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        des:{
            type: String,
            required: true,
        },
        postType:{
            type: String,
            required: true
        },
        category:{
            type: String, 
            required: true
        },
        location:{
            type: String, 
            required: true
        },
        lostDate: {
            type: String, 
            required: true
        },
        email:{
            type: String, 
            required: true
        },
        avatar:{
            type: String, 
            required: true
        },
        authorName:{
            type: String, 
            required: true
        },
        isRecovered:{
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
)

const PostModel = mongoose.model('Post', PostSchema)

export { PostModel }