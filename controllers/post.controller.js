import { PostModel } from "../models/post.model.js"
import { RecoverModel } from "../models/recover.model.js"

// Create A New Post - PORT
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


// Post Reading - GET
const ReadPost = async (req, res) => {
    const { postid } = req.query

    if(!postid){
        return res.status(400).send({msg: 'Must give post id'})
    }

    try{
        const post = await PostModel.findById(postid)
        if(post){
            return res.send(post)
        }else{
            return res.status(400).send({error: 'no-post-found'})
        }
    }
    catch(err){
        return res.status(400).send({error: 'no-post-found'})
    }
}   


// Recover Post - POST
const AddRecoverPost = async (req, res) => {
    const { 
        ownerName,
        ownerEmail,
        postTitle,
        location,
        postId,
        postLostDate,
        recoverDate
    } = req.body
    try{
        const updatePost = await PostModel.findByIdAndUpdate(
            postId,
            {isRecovered: true},
            { new: true, runValidators: true } 
        )

        if(!updatePost){
            return res.status(400).send({error: 'post-not-updated', succes: false})
        }

        const newRecover = new RecoverModel({
            ownerName,
            ownerEmail,
            postTitle,
            location,
            postId,
            postLostDate,
            recoverDate
        })

        const savedRecover = await newRecover.save()

        res.send(savedRecover)
    }   
    catch(err){
        res.status(400).send(err)
    }
}



// Read All Recovered Items - GET
const ReadAllRecovered = async (req, res) => {
    const { email } = req.query

    try{
        const allReCovered = await RecoverModel.find({ownerEmail: email})
        if(!allReCovered){
            return res.send({msg: 'not-data-found', succes: true})
        }
        res.send(allReCovered)
    }
    catch(err){
        res.status(400).send({succes: false})
    }
}
 
// Read all latest posts with limit - GET
const ReadPostWithLimit =  async (req, res) => {

    const limit = parseInt(req.query.limit) || 6

    try{
        const limitedPosts = 
                await PostModel
                    .find()
                    .limit(limit)
                    .sort({createdAt: -1})
                    .select('-des -email -location -isRecovered')
        return res.send(limitedPosts) 
    }
    catch(err){
        res.status(400).send({error: 'Something went wrong', succes: false})
    }
}


// Read All user Posted Items - GET
const ReadAllUserPostedItems = async (req, res) => {
    const { email } = req.query
    try {
        if (!email) {
            return res.status(400).send({ error: "Email query is required" })
        }
        const finAllDataByEmail = await PostModel.find({ email: email })

        res.send(finAllDataByEmail)

    } catch (err) {

        res.status(500).send({
            error: "Something went wrong to get data",
            msg: err.message, 
        })
    }
}


// Delete Post By user and Post id
const DialogeletePostByPostId = async (req, res) => {
    const { postid } = req.query; 

    if (!postid) {
        return res.status(400).send('Post ID is required');
    }

    try{
        const deletePost = await PostModel.findByIdAndDelete(postid)

        if (!deletePost) {
            return res.status(404).json({ error: 'Post not found', succes: false });
        }
      
        res.status(200).json({ msg: 'Post deleted successfully', succes: true });    }
    catch(err){
        res.status(500).json({ error: 'something went wrong' });
    }
};


// UpdatePostBy Id
const UpdatePostById = async (req, res) => {
    const { postid } = req.query;
    const { authorName, email, lostDate, avatar, postType, category, des, location, title, thumb } = req.body;
  
    try {
      const findAndUpdate = await PostModel.findByIdAndUpdate(
        postid,
        {
          thumb: thumb,
          title: title,
          des: des,
          postType: postType,
          category: category,
          location: location,
          lostDate: lostDate,
          email: email,
          avatar: avatar,
          authorName: authorName,
        },
        { new: true, runValidators: true }
      );
  
      if (!findAndUpdate) {
        return res.status(404).json({ msg: 'Post not found' , succes: true});
      }

      res.status(200).json(findAndUpdate);
    } catch (err) {  
      res.status(500).json({ msg: 'Something went wrong to updating the post', error: err.message });
    }
  };


// All Post Infinitie Scroll Api
const AllPostInfinte = async (req, res) => {
    const { pages = 1, limit = 10 } = req.query;

    const pageLimit = parseInt(pages, 10);
    const limits = parseInt(limit, 10);
    const offset = (pageLimit - 1) * limits;

    try {
        const totalPosts = await PostModel.countDocuments();
        const allPosts = await PostModel.find().skip(offset).limit(limits).sort({createdAt: -1})

        res.json({
            posts: allPosts,
            totalPosts,
            currentPage: pageLimit,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export { CreateNewPost, ReadPost, AddRecoverPost, ReadAllRecovered, ReadPostWithLimit, ReadAllUserPostedItems, DialogeletePostByPostId, UpdatePostById, AllPostInfinte }