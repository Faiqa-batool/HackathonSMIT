var express = require("express");
var router = express.Router();
const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

// router.get("/", function (req, res) {
//   res.render("index");

// });

router.get("/", function (req, res) {
  res.render("index", { footer: false });
});

router.get("/MainPage",isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render("MainPage", { footer: true, user});
});

// router.post("/register", function (req, res, next) {
//   const userData = new userModel({
//     username: req.body.username,
//     name: req.body.name,
//     email: req.body.email
//   });

//   userModel.register(userData, req.body.password)
//   .then(function(){
//     passport.authenticate("local")(req, res, function(){
//       res.redirect("/MainPage?message=AccountCreated");
      
//     });
//   });
// });

router.post("/register", function (req, res, next) {
  const userData = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email
  });

  userModel.register(userData, req.body.password, function (err) {
    if (err) {
      console.error("Error registering user:", err);
      return next(err);
    }

    passport.authenticate("local")(req, res, function () {
      res.redirect("/MainPage?message=AccountCreated");
    });
  });
});



router.post("/login",passport.authenticate("local",{
  successRedirect: "/MainPage",
  failureRedirect: "/",
  failureFlash: true // Enable flash messages for failed authentication
}) , function (req, res) {
});

// Route for the project submission page
router.get('/SubmitProject', function(req, res)  {
  res.render('SubmitProject'); // Update 'submitProject' with the actual name of your project submission template
});
// Route for submitting the project form data
router.post('/submitProject', function(req, res) {
  // Handle the form submission logic here
  // You might want to save the submitted data to your MongoDB projects collection
  res.send('Project submitted successfully!');
});

router.post("/logout", function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/")
}




module.exports = router;