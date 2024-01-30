const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/HackathonSMIT");

mongoose.connect("mongodb://127.0.0.1:27017/HackathonSMIT", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
  
const userSchema = mongoose.Schema({
  username: String,
  name: String, 
  email: String,
  password: String, 
});

userSchema.plugin(plm);
module.exports = mongoose.model("user", userSchema);
