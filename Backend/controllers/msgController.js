import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";
import mongoose from "mongoose";

const msgSend = async (req, res, next) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { message } = req.body;

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

    res.status(201).json({ success: true, newMessage });

    // session.commitTransaction();
    // session.endSession();
  } catch (error) {
    // session.abortTransaction();
    // session.endSession();
    next(error);
  }
};

const getMsg = async (req, res, next) => {
  const { id: otherUser } = req.params;
  const userId = req.user._id;

  const conversation = await conversationModel
    .findOne({
      participants: { $all: [otherUser, userId] },
    })
    .populate("messages");
  if (!conversation) {
    return res.status(201).json([]);
  }
  res.status(201).json(conversation.messages);
};

export { msgSend, getMsg };