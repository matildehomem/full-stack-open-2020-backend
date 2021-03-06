const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
var uniqueValidator = require("mongoose-unique-validator");
mongoose.set("useCreateIndex", true);


const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, minlength: 8}
});


personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Person", personSchema);