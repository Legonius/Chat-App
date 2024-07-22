import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages", default: [] }],
  },
  { timestamps: true }
);
const conversationModel = model("Convasations", conversationSchema);
export default conversationModel;
