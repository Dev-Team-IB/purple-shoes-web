const mongoose = require("mongoose");

const { messageSchema } = require("../schemas/message");

const chatRoomSchema = mongoose.Schema({
  userID: {
    type: String,
    unique : true,
  },
  lastChat: {
    type: Date,
    default: Date.now,
    required: false,
  },
  userLastVisit: {
      visitID : {
        type: String,
        required: false,
      },
      lastVisit : {
        type: Date,
        required: false,
      },
    },
  messages: [messageSchema],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = { ChatRoom };