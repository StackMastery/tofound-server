import { VerifyUser } from "../middlewares/Verifyuser.js"
import { PostModel } from "../models/post.model.js"

// Create A New Post 
const CreateNewPost = async (req, res) => {

    const { authorName, email, lostDate, avatar, postType, category, des, location, title, thumb } = req.body

    try{
        const newPost = new PostModel({
            thumb: thumb,
            title: title,
            des: des,
            postType: postType,
            category: category,
            location: location,
            lostDate: lostDate,
            email: email,
            avatar: avatar,
            authorName: authorName
        })

        const savedPost = await newPost.save()

        if(savedPost){
            res.send(savedPost)
        }else{
            res.status(400).send({succes: false})
        }

    }
    catch(err){
        res.send(err)
    }
}

export { CreateNewPost }