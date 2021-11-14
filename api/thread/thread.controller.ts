import Thread from './thread.model'
import Comment, { IComment } from '../comment/comment.model'
import User from '../user/user.model'

export async function getThreads(req, res, next) {
  try {
    const courseId = req.params.courseId
    const pinned = await Thread.find(
      { courseId: courseId, pinned: true },
      { content: 0, photos: 0, courseId: 0, isEdited: 0, pinned: 0 }
    )
      .sort('title')
      .populate('userId', '-_id -email -password -courses -__v -role')

    const notPinned = await Thread.find(
      { courseId: courseId, pinned: false },
      { content: 0, photos: 0, courseId: 0, isEdited: 0, pinned: 0 }
    )
      .sort('-createdAt')
      .populate('userId', '-_id -email -password -courses -__v -role')

    res.status(200).json({ pinned, notPinned })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function searchThreads(req, res, next) {
  try {
    const { toSearch, courseId } = req.body
    const notPinned = await Thread.find(
      {
        courseId: courseId,
        pinned: false,
        $or: [
          { title: { $regex: toSearch, $options: 'i' } },
          { content: { $regex: toSearch, $options: 'i' } },
        ],
      },
      { content: 0, photos: 0, courseId: 0, isEdited: 0, pinned: 0 }
    )
      .sort('-createdAt')
      .populate('userId', '-_id -email -password -courses -__v -role')
    res.status(200).json(notPinned)
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function getThreadInformation(req, res, next) {
  try {
    const threadId = req.params.threadId
    const info = await Thread.findOne(
      { _id: threadId },
      { courseId: 0, pinned: 0, category: 0 }
    ).populate('userId', '-_id -password -courses -__v -role')

    const comments = await Comment.find({ threadId: threadId })
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: '-_id -password -courses -__v -role',
        },
      })
      .populate('userId', '-password -courses -__v -role')

    res.status(200).json({ info, comments })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function createThread(req, res, next) {
  try {
    const { title, content, category, photos, courseId, email } = req.body
    const params = {
      pinned: false,
      score: 0,
      replies: 0,
      title: title,
      content: content,
      category: category,
      photos: photos,
      courseId: courseId,
    }
    const id = await (await User.findOne({ email: email }))._id
    await Thread.create({
      ...params,
      userId: id,
    })
    res.status(204).end()
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function updateThread(req, res, next) {
  try {
    const { _id, title, content } = req.body
    await Thread.findByIdAndUpdate(_id, { title: title, content: content })
    res.status(204).end()
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export async function deleteThread(req, res, next) {
  try {
    const { _id } = req.body
    //await Thread.deleteOne({ _id: _id })
    //const thread = await Thread.findById(_id)
    const listComment = []
    const listIdFather = []
    const comments = await Comment.find({ threadId: _id })

    for (let i = 0; i < comments.length; i++) {
      const innerComment = comments[i].comments
      listIdFather.push(comments[i]._id)
      for (let j = 0; j < innerComment.length; j++) {
        listComment.push(innerComment[j])
      }
    }

    await Comment.deleteMany({ _id: listComment })
    await Comment.deleteMany({ _id: listIdFather })
    await Thread.deleteOne({ _id: _id })

    res.status(204).end()
  } catch (e) {
    console.error(e)
    next(e)
  }
}
