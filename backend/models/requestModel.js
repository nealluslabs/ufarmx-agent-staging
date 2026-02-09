import mongoose from 'mongoose'
//const mongoose= require('mongoose')

const Schema = mongoose.Schema




const requestsSchema =  mongoose.Schema({
   


       requestObject:{type: mongoose.Schema.Types.Mixed ,required:false },
        
        is_deleted:{type:Boolean ,required:false },

        last_updated_by:{type:mongoose.Schema.Types.ObjectId,required:false},
        form_id:{type:mongoose.Schema.Types.ObjectId,required:false},
        retailer_id:{type:mongoose.Schema.Types.ObjectId,required:false},
       retailer_farmer_id:{type:mongoose.Schema.Types.ObjectId,required:false},
        
        totalAmount:{type:String,required:false},
        status:{type:String,required:false},
       invoice:{type:String,required:false},
       name:{type:String,required:false},
       requestDocs: {
            offerLetterUrl: { type: String, required: false },
            invoiceUrl: { type: String, required: false },
          },
      paymentTerms:{type:String,required:false},
      farmerName:{type:String,required:false},
      maturityDate : { type : Date, default: Date.now },
      paymentDueDate : { type : Date,required:false, default: null},
      approvedDate : { type : Date,required:false, default: Date.now },
      farmerId: {type: String ,required:false},
      products: { type: [mongoose.Schema.Types.Mixed], required: false },
      productId: {type: mongoose.Schema.Types.ObjectId,required:false},
      productName: {type: String,required:false},
      quantity: {type: String,required:false},
      location: {type: String,required:false},
      phone_number: {type: String,required:false},
      paymentsMade:{type:Array,required:false,default:[]}



        
        
        
},{timestamps:true,strict:false /*you want a createdAt? you add timestamps:true*/})


const Requests = mongoose.model('Requests',requestsSchema)

/*the this Requests you export, you set a new instance
 of it anytime you want to save it to database
 N.B MongoDB uses mongoose ORM/ODM unlinke SQL databases cuz
 sql databases come with a structure that you put in through a GUI
 
 coming back a year later.. this statement is not exactly true
 
 SQL HAS ITS OWN ORM
 
 */

//exports.Requests = Requests
export default Requests