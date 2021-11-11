import Comment from './comment.model'
import User from '../user/user.model'
import Thread from '../thread/thread.model'

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
    } else {
      await Thread.findOneAndUpdate({ _id: threadId }, { $inc: { replies: 1 } })
    }
    res.status(204).end()
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function updateComment(req, res, next) {
  try {
    const { _id, content } = req.body
    await Comment.findByIdAndUpdate(_id, { content: content })
    res.status(204).end()
  } catch (e) {
    console.error(e)
    next(e)
  }
}
