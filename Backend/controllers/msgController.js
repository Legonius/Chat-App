import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import { getSocketId, io } from "../websocket.js";
import { errorHandling } from "../utils/error.js";

const msgSend = async (req, res, next) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { message } = req.body;
    if (!message) {
      next(errorHandling(401, "Mesagge not found."));
    }
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }
    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    //Socket io Functionallity session

    const socketReceiverId = getSocketId(receiverId);

    if (socketReceiverId) {
      io.to(socketReceiverId).emit("privateMsg", { success: true, newMessage });
    }

    res.status(201).json({ success: true, newMessage });

    // session.commitTransaction();
    // session.endSession();
  } catch (error) {
    // session.abortTransaction();
    // session.endSession();
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMsg = async (req, res, next) => {
  try {
    const { id: otherUser } = req.params;
    const userId = req.user._id;
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [otherUser, userId] },
      })
      .populate("messages");
    if (!conversation) {
      res.status(200).json({ success: true, data: [] });
      return;
    }
    res.status(200).json({ success: true, data: conversation.messages });
  } catch (error) {
    errorHandling(500, error.message);
  }
};

export { msgSend, getMsg };
