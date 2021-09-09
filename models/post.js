var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var PostSchema = new Schema(
    {
        content: {type: String, maxlength: 280, required: true},
        timestamp: {type: Date, required: true},
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    }
);

// Virtual
PostSchema.virtual('url').get(function () {
  return '/post/' + this._id;
});

// Virtual formatted timestamp
PostSchema
.virtual('timestamp_formatted')
.get(function () {
    if(this.timestamp){
        var date = DateTime.fromJSDate(this.timestamp)
        var month = date.month.toString().length === 2 ? date.month : '0'+date.month
        var day = date.day.toString().length === 2 ? date.day : '0'+date.day
        var inputDate = date.year+'-'+month+'-'+day
        return inputDate;
      }
});

//Export model
module.exports = mongoose.model('Post', PostSchema);