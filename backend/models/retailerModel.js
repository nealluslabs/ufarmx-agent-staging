import mongoose from 'mongoose'
//const mongoose= require('mongoose')

const Schema = mongoose.Schema
//const reviewSchema = mongoose.Schema({
//  name:{type: String ,required:true},
//  rating:{type: Number ,required:true},
//  comment:{type: String ,required:true},
//  user:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'User'}
//}, {timestamps:true})

const nameSchema = mongoose.Schema({
  name:{type: String ,required:false}
})

const RetailerSchema =  mongoose.Schema({
      
       age:{type:String ,required:false },
        companyName:{type:String ,required:false },
        companyEmail:{type:String,required:false ,default:"default@gmail.com"},
        phoneNumber:{type:String,required:false ,default:"023456789"},
        companyAddress:{type:String,required:false ,default:"sample address"},
      retailer_user_id:{type:mongoose.Schema.Types.ObjectId,required:false, ref:'User'},
      availableBalance:{type:Number ,required:false ,default:0},
      totalDisbursed:{type:Number ,required:false ,default:0},
      totalCollected:{type:Number ,required:false ,default:0},
         profit:{type:Number ,required:false ,default:0},
        //price:{type:String ,required:false ,default:"0"},
        



},{timestamps:true,strict: false /*you want a createdAt? you add timestamps:true*/})


const Retailer = mongoose.model('Retailers',RetailerSchema)

/*the this Product you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM/ODM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI
 
 coming back a year later.. this statement is not exactly true*/

//exports.Product = Product
export default Retailer