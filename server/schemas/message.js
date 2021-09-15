const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  userName: {
    type: String,
    required: false,
  },
  userRole: {
    type: Number,
    required: false,
  },
  content: { // 메세지는 최대 1000자로 제한
    type: String,
    required: false,
    maxlength: 1000,
  },
  isImage: { // isImage가 true일 경우 content는 이미지 제목
    type: Boolean,
    default : false,
    required: false,
  },
  imageInfo: {
    data : { // 이미지 파일
      type: Buffer,
      required: false,
    },
    contentType : {  // 이미지 형식
      type: String,
      required: false,
    },
  },
  sendDate : {
    type: Date,
    default: Date.now,
    required: false,
  },
});

module.exports = { messageSchema };