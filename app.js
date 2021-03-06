var express 	      = require("express"),
	 app 		         = express(),
	 methodOverride   = require("method-override"),
	 expressSanitizer = require("express-sanitizer"),
	 bodyParser	      = require("body-parser"),
	 mongoose	      = require("mongoose");
	 


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL, {useMongoClient : true}, function(err){
    if (err) {
        console.log(process.env.DATABASEURL);
        console.log("Database is not connected.");
    } else {
        console.log("Database connected successfully.");
    }
    
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


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

//NEW ROUTE
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

//CREATE ROUTE
app.post('/blogs', function(req, res){
   //create the blog
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
      if(err){
         res.render("new");
      } else {
         //then redirect to the index
         res.redirect("/blogs");
      }
   });
});

//SHOW ROUTE
app.get('/blogs/:id' ,function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
         res.redirect('/blogs');
      } else {
         res.render("show", {blog : foundBlog});
      }
   });
});

//EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog){
      if(err){
         res.redirect("/blogs");
      } else {
         res.render("edit", { blog : foundBlog });
      }
   });
});

//UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
   // Blog.findByIdAndUpdate(id,data,callback)
   req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
         res.redirect("/blogs");
      } else {
         res.redirect("/blogs/" + req.params.id); 
      }
   });
});

// DELETE A BLOG
app.delete('/blogs/:id/', function(req,res){
       Blog.findByIdAndRemove(req.params.id, function(err){
       if(err){
          res.redirect("/blogs");
       } else {
          res.redirect("/blogs");
       }
    });
   
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The RESTFUL server has started.");
});

