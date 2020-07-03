var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    User=require("./models/user"),
    Trans=require("./models/transaction"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose")
   
    
mongoose.connect("mongodb://localhost/iwp");
const port=3000;

app.use(require("express-session")({
    secret:"Hi there", //secret will be used to encode and decode the sessions. Data will not be stored inside the sessions.
    resave:false,
    saveUninitialized:false

}));


app.set("view engine","ejs"); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res)
       {
    res.render("home");
})

app.get("/home",function(req,res){
    res.render("home");
});

app.get("/index",isLoggedIn,function(req,res)
       {
   res.render("index"); 
});

app.get("/register",function(req,res){
   res.render("register");
});

app.post("/register",function(req,res)
        {
    User.register(new User({username: req.body.username}), req.body.password,function(err,user){
        if(err)
            {
                console.log(err);
                return res.render("register");
            }
        //passport.authenticate will care of the information stored and will take care of the seesion.
        passport.authenticate ("local")(req,res,function()
                    {
            res.redirect("/index");
        });
    });
});

app.get("/login",function(req,res)
       {
   res.render("login"); 
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login"
}),function(req,res)
        {
});

app.get("/logout",function(req,res)
       {
    req.logout(); 
    res.redirect("/");
});

app.get("/all",function(req,res)
       {
   res.render("show"); 
});

app.get("/hospital",function(req,res)
       {
    res.render("hospital");
});

app.get("/accessories",function(req,res)
       {
    res.render("accessories");
});

app.get("/apply",function(req,res)
       {
    res.render("apply");
});

app.post("/apply",function(req,res)
        {
    var tid=req.body.tid;
    var amt=req.body.amount;
    var trans={transid:tid,amount:amt}; 
    
Trans.create(trans,function(err,newtrans)
                     {
       if(err)
           {
               console.log(err);
           }
        else
            {
                res.redirect("/apply");
                console.log("Your reimbursement has been recorded");
            }
    });
});


app.get("/products",function(req,res)
       {
    res.render("products");
});

/*var prodSchema=new mongoose.Schema(
{
    prodname:String,
    prodid:String,
    prodprice:String
});

var Product=mongoose.model("Product",prodSchema);

Product.create(
{
    prodname:"Apple Ipad",
    prodid:4,
    prodprice:"48000"
},function(err,product)
{
    if(err)
        {
            console.log(err);
        }
    else
        {
            console.log(product);
        }
});*/

function isLoggedIn(req,res,next) //this is the standard format for any middleware
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
    
}

app.listen(port, () => console.log(`server listening at ${port}!`));