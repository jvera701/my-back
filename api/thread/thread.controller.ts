import Thread from '../thread/thread.model'

export async function getThreads(req, res, next) {
  try {
    const courseId = req.params.courseId
    const ans = await Thread.find(
      { courseId: courseId },
      { _id: 0, content: 0, photos: 0, courseId: 0 }
    ).populate('userId', '-_id -email -password -courses -__v')
    //{title, pinned, isEdited, score, category, userId.name} = ans
    res.status(200).json(ans)
  } catch (e) {
    console.error(e)
    next(e)
  }
}
