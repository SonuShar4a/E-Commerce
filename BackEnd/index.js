 
const express=require('express');
const server=express();
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const productRoutes=require('./routes/Products')
const brandRoutes=require('./routes/Brand')
const usersRouter = require('./routes/User');
const categoryRoutes=require('./routes/Category');
const authRouter = require('./routes/Auth');
const cartRoutes=require('./routes/Cart');
const orderRoutes=require('./routes/Order');
const session=require('express-session');
const passport=require('passport');
// const SQLiteStore=require('connect-sqlite3')(session);
const LocalStrategy=require('passport-local').Strategy;
const { User } = require('./model/User');

//midlewares
server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    // store: new SQLiteStore({db:'sessions.db',dir:'./var/db'})
}))
server.use(passport.authenticate('session'));

server.use(bodyParser.json());
server.use('/products',productRoutes.router);
server.use('/categories',categoryRoutes.router);
server.use('/brands',brandRoutes.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart',cartRoutes.router);
server.use('/order',orderRoutes.router);


//passport Strategies....
passport.use(new LocalStrategy(
   async function(username, password, done) {
        try {
            const user = await User.findOne({ email: username}).exec();
            console.log({user});
            
            if (!user) {
                done(null,false,{ message: 'Invalid  credentials' })
            }
            else if (user.password === password) {
               done(null,user);
            }
            else {
             done(null,false,{message: "Invalid  credentials" })
            }
        } catch (error) {
             done(error);
             console.log("DSD");
             
        }
  }));

  // this creates session variable req.user on being called from callbacks
  passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {id:user.id,role:user.role});
    });
  });
  
  //this changes session variable req.user when called from authorized rwequest
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

main().catch(err=>console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
    console.log("Mongodb Connected");
    
}

server.get('/',(req,res)=>{
    res.json({status:"success"})
})

 

server.listen(8080,()=>{
    console.log("server start");
    
})