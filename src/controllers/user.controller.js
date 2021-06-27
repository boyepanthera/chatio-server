import { User } from '../models'

const GetLoggedInUserController = async (req, res) => {
  try {
    const { _id } = req.decoded
    const user = await User.findById(_id)
    if (!user)
      return res.status(404).json({
        message: 'user not found',
      })
    return res.status(200).json({
      message: 'user fetched!',
      user,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues fetching user ${err.message}`,
    })
  }
}

const GetUserByIdController = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user)
      return res.status(404).json({
        message: 'user not found',
      })
    return res.status(200).json({
      message: 'user fetched!',
      user,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues fetching user ${err.message}`,
    })
  }
}

const UpdateUserController = async (req, res) => {
  try {
    const { userId } = req.params
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })
    if (!updatedUser) {
      return res.status(404).json({
        message: 'user cannot be updated!. not found',
      })
    }
    return res.status(200).json({
      message: 'user updated!',
      user: updatedUser,
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues updating user ${err.message}`,
    })
  }
}

const DeleteUserController = async (req, res) => {
  try {
    const { _id } = req.decoded
    const deletedUser = await User.findByIdAndDelete(_id)
    if (!deletedUser) {
      return res.status(404).json({
        message: 'user cannot be deleted!. not found',
      })
    }
    return res.status(200).json({
      message: 'user deleted!',
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: `issues deleting user ${err.message}`,
    })
  }
}

export {
  GetLoggedInUserController,
  GetUserByIdController,
  UpdateUserController,
  DeleteUserController,
}
