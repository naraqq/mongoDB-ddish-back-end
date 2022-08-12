const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
});

const MyList = mongoose.model("List", ListSchema);

module.exports = { MyList };