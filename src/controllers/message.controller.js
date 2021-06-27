import { Message } from '../models'

const GetMessagesController = async (req, res) => {
  try {
    const { userId } = req.query
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    })
    return res.status(200).json({
      message: 'conversations fetched!',
      messages,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues fetching conversations ${err.message}`,
    })
  }
}

const GetMessageByIdController = async (req, res) => {
  try {
    const { messageId } = req.params
    const singleMessage = await Message.findById(messageId)
    return res.status(200).json({
      message: 'single message fetched!',
      singleMessage,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues fetching single message ${err.message}`,
    })
  }
}

const CreateMessageController = async (req, res) => {
  try {
    const createdMessage = await Message.create(req.body)
    return res.status(200).json({
      message: 'message created!',
      message: createdMessage,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues fetching single message ${err.message}`,
    })
  }
}

const DeleteMessageController = async (req, res) => {
  try {
    const { messageId } = req.params
    const deletedMessage = await Message.findByIdAndDelete(messageId)
    if (!deletedMessage) {
      return res.status(404).json({
        message: 'message cannot be deleted!. not found',
      })
    }
    return res.status(200).json({
      message: 'message deleted!',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues deleting message ${err.message}`,
    })
  }
}

export {
  GetMessagesController,
  GetMessageByIdController,
  CreateMessageController,
  DeleteMessageController,
}
