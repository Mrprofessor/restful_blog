var express 	= require("express"),
	app 		= express(),
	bodyParser	= require("body-parser"),
	mongoose	= require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/restful_blog_app");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//MONGOOSE  /MODEL CONFIG
var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: { type: Date,default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);        

// Blog.create({
//    title: "Test Blog",
//    image : "http://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//    body : "This is a BLOG POST"
// });

// RESTFUL ROUTES
app.get('/', function(req, res) {
    res.redirect("/blogs");
});

app.get('/blogs', function(req,res){
   Blog.find({}, function(err, blogs){
      if(err){
         console.log("ERROR");
      } else {
         res.render("index", {blogs: blogs});
      }
   });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The RESTFUL server has started.");
});

