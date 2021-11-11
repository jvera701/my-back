import Comment from './comment.model'
import User from '../user/user.model'

export async function createComment(req, res, next) {
  try {
    const { content, threadId, email, parentCommentId } = req.body
    const userId = await (await User.findOne({ email: email }))._id
    const finalThread = threadId === '' ? null : threadId
    const params = {
      content: content,
      score: 0,
      photos: [],
      threadId: finalThread,
      userId: userId,
      comments: [],
    }
    const newComment = await Comment.create({
      ...params,
    })
    if (threadId === '') {
      await Comment.findOneAndUpdate(
        { _id: parentCommentId },
        { $push: { comments: newComment._id } }
      )
    }
    const success = 'success'
    res.status(200).json(success)
  } catch (e) {
    console.error(e)
    next(e)
  }
}
