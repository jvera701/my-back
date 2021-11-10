import Thread from '../thread/thread.model'
import Comment from '../comment/comment.model'

export async function getThreads(req, res, next) {
  try {
    const courseId = req.params.courseId
    const pinned = await Thread.find(
      { courseId: courseId, pinned: true },
      { _id: 0, content: 0, photos: 0, courseId: 0, isEdited: 0, pinned: 0 }
    )
      .sort('title')
      .populate('userId', '-_id -email -password -courses -__v -role')

    const notPinned = await Thread.find(
      { courseId: courseId, pinned: false },
      { _id: 0, content: 0, photos: 0, courseId: 0, isEdited: 0, pinned: 0 }
    )
      .sort('-date')
      .populate('userId', '-_id -email -password -courses -__v -role')

    res.status(200).json({ pinned, notPinned })
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
      { _id: 0, courseId: 0, pinned: 0, category: 0 }
    ).populate('userId', '-_id -email -password -courses -__v -role')

    const comments = await Comment.find({ threadId: threadId })
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: '-_id -email -password -courses -__v -role',
        },
      })
      .populate('userId', '-_id -email -password -courses -__v -role')

    res.status(200).json({ info, comments })
  } catch (e) {
    console.error(e)
    next(e)
  }
}
