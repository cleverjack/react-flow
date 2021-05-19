const mongoose = require('mongoose');

const FlowSchema = mongoose.Schema({
    data: {
      type: Array,
      required: true
    }
});

const Flow = mongoose.model('Flow', FlowSchema)

module.exports = Flow;
