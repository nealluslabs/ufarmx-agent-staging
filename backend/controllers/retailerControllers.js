import Product from '../models/productModel.js'
import User from '../models/userModel.js'
import RetailerProduct from '../models/retailerProductModel.js'
import Retailer from '../models/retailerModel.js'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import generateToken from '../utils/generateToken.js'
import nodemailer from "nodemailer";
import dotenv from 'dotenv'
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { v4 as uuidv4 } from 'uuid';

const ses = new SESClient({ region: "us-east-1" });
//const dotenv = require('dotenv')

//const Product = require('../models/productModel.js')
//const asyncHandler = require('express-async-handler')
//const mongoose = require('mongoose')

dotenv.config()




// Initialize the SES client
const sesClient = new SESClient({
  region: "eu-west-2", // e.g. "us-east-1" - come and remove these environemt variables before pushing o !
  credentials: {
    accessKeyId:process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey:process.env.REACT_APP_SECRET_ACCESS_KEY,
  },
});


const getRetailers = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  const retailers = await Retailer.find({agentId:req.query.agentId && req.query.agentId})
  
  console.log("RETAILERS WITH AGENT ID --->",retailers)


  res.json(retailers)
})

//@desc  Fetch all products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const pageSize = 5 //i recommend 6 per page
     const page = Number(req.query.pageNumber) || 1

 const vendorName = req.query.vendorName  //if your vendorName logic is messing up, come and change it to resemble that of keyword, with the empty object
let count;
let products;

  const keyword = req.query.keyword ? {
   name: {
     $regex: req.query.keyword,
     $options:'i' // it means case insensitive 
   }
 
 }:{}
 
 // I am instructing my getProducts controller to tune it's search, based on if there's a vendor name or not 
 vendorName !==''?( /* -- I WANT TO PUT WHERE COUNT IN STOCK IS GREATER THAN ZERO  */
   count = await Product.countDocuments({...keyword, vendor:vendorName}), 
  products = await Product.find({...keyword, vendor:vendorName}).limit(pageSize).skip(pageSize *(page-1))) :
(count = await Product.countDocuments({...keyword,countInStock:{$gt:0}}),
products = await Product.find({...keyword, countInStock:{$gt:0}}).limit(pageSize).skip(pageSize *(page-1)))


  res.json({products,page,pages:Math.ceil(count/pageSize)})
})


//@desc  Add a new Retailer
//@route POST /api/retailer/add
//@access Public
//@desc  Create a retailer (admins only)
//@route POST /api/retailer/adminsonly
//@access Public
const addNewRetailer = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  
  try{
    console.log("WE HAVE REACHED CREATE NEW RETAILER BY ADMIN!--->",req.body)

  
const passwordRandom = uuidv4();

//creating in the users collection
const user =  new User({
  
   email:req.body.email,
  is_active:true,
  role:"Retailer",
  password:passwordRandom && passwordRandom.slice(0,8), //use random figure generator here
  passWord:passwordRandom && passwordRandom.slice(0,8), //use random figure generator here
  firstName: req.body.firstName,
  lastName: req.body.lastName,
 
 
})

const createdUser = await user.save()

//creating in the users collection end


//creating in the retailers collection

const retailer = new Retailer({
  agentId: req.body.agentId ?? " ", //checked
  agent_user_id: req.body.agent_user_id
  ? new mongoose.Types.ObjectId(req.body.agent_user_id)
  : undefined,
  age: req.body.age ?? " ", //checked
  address: req.body.address ?? " ", //checked
  businessAddress: req.body.businessAddress ?? " ", //checked
  businessName: req.body.businessName ?? " ", //checked
  cacCertificateUrl: req.body.cacCertificate ?? " ", //checked
  companyEmail: req.body.email ?? " ", //checked
  completeAndAccurateApplication: req.body.completeAndAccurateApplication ?? " ",//checked
 
  currentState: req.body.state ?? " ", //checked
  //dateOfBirth: req.body.dateOfBirth ?? " ",
  email: req.body.email ?? " ", //done
  firstName: req.body.firstName ?? " ", //done
  gender: req.body.gender ?? " ", //done
  idDocument: " ", //checked
  idDocumentUrl: req.body.idDocument ?? " ", //checked
  lastName: req.body.lastName ?? " ", //done
  localGovernment: req.body.lga ?? " ", //done
  meansOfId: req.body.idType ?? " ", //checked
  memartUrl: req.body.memart ?? " ", //checked
  meterNumber: req.body.meter ?? " ", //checked
  middleName: req.body.otherNames ?? " ", //done
  nationality: req.body.nationality ?? " ", //done
  nearestLandmark: req.body.landmark ?? " ", //checked
  nin: req.body.nin ?? " ", //checked
  phoneNumber: req.body.phone ?? " ", //done
  proofOfAddressUrl: req.body.proofOfAddress ?? " ", //checked
  retailer_user_id: new mongoose.Types.ObjectId(createdUser._id),
  retailerRiskScore:req.body.retailerRiskScore ?? " ",
  shopOwnership: req.body.shopOwnership ?? " ", //checked
  shopPhotosUrl: req.body.shopPhotos ?? " ", //checked
  shopSize: req.body.shopSize ?? " ", //checked
  stockValue: req.body.stockValue ?? " ", //checked
  state: req.body.state ?? " ", //checked
  stateOfOrigin: req.body.state ?? " ", //done
  statusReportUrl: req.body.statusReport ?? " ", //checked
  storeName: req.body.businessName ?? " ", //checked
  tin: req.body.tin ?? " ", //checked
  utilityBill: " ", //checked
  utilityBillUrl: req.body.utilityBill ?? " ", //checked
  utilityType: req.body.utilityType ?? " ", //checked
  yearsInBusiness: req.body.businessTenure ?? " ", //checked
  totalCollected:0,
  totaDisbursed:0
});


const createdRetailer = await retailer.save()


//creating in the retailers collection end




    /*SEND WELCOME EMAIL TO RETAILER*/

     // Initialize the SES client
const sesClient = new SESClient({
  region: "eu-west-2", // e.g. "us-east-1" - come and remove these environemt variables before pushing o !
  credentials: {
    accessKeyId:process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey:process.env.REACT_APP_SECRET_ACCESS_KEY,
  },
});




     try {
      const params = {
        Destination: {
          ToAddresses: [req.body.email], // recipient email
        },
        Message: {
          Body: {
            Text: {
              Data: "Welcome to the Ufarmx platform! 🚀.",
            },
            Html: {
              Data: ` <h2>Welcome to uFarmX!</h2>
                     <p>Dear <strong>${req.body.firstName &&req.body.firstName||req.body.lastName &&req.body.lastName }</strong>,</p>
                     <br/>
                     <br/>
                      <p>You have been registered as ${req.body.role && req.body.role === "Retailer"?"a":"a"} ${req.body.role && req.body.role} on the platform.</p>
                      <br/>
                      <p>Your account has been created. And your password is ${req.body.password &&req.body.password}.</p>
                      <br/>
  
                     
  
                      <p>Kindly login to the platform with your email and password.</p>
                      <br/>
  
                      <p>Warm Regards,</p>
                      <p>– The uFarmX Team</p>`
            },
          },
          Subject: {
            Data: "Welcome to UfarmX – Empowering Farmers Together",
          },
        },
        Source: 'info@ufarmx.com'//process.env.SES_FROM_EMAIL, // must be a verified SES sender
      };
  
      //WE PAUSE ON SENDING EMAILS FOR NOW
      // const command = new SendEmailCommand(params);
     //  /*const response =*/ await sesClient.send(command);
  
     // console.log("✅ Email sent successfully:", response.MessageId);
      //res.status(201).json(createdRetailer)
      return res.status(201).json({ ...createdRetailer, message: "successful" });



      /*SEND WELCOME EMAIL TO RETAILER -END*/
    
    } catch (error) {
      console.error("❌ Error sending email:", error);
      return res.status(200).json({ message: "Server error, email not sent" });
    }


}
  catch(error){
    res.status(400).json({ message: "Failed to add create retailer", error: error.message });
}
})












const sendWelcomeEmail = asyncHandler(async (req,res)=>{
  try {
    const params = {
      Destination: {
        ToAddresses: [req.body.email], // recipient email
      },
      Message: {
        Body: {
          Text: {
            Data: "Welcome to the Ufarmx platform! 🚀 We're glad to have you on board.",
          },
          Html: {
            Data: ` <h2>Welcome to uFarmX!</h2>
                   <p>Dear <strong>${req.body.firstName &&req.body.firstName||req.body.lastName &&req.body.lastName }</strong>,</p>
                   <br/>
                   <br/>
                    <p>Welcome to UfarmX! We’re excited to have you join our network of partners committed to empowering farmers with access to the credit and resources they need to thrive.</p>
                    <br/>
                    <p>By joining, you’re now part of a growing ecosystem that connects retailers, farmers, and financial opportunities in a way that drives sustainable growth across communities. Your participation not only helps farmers access the credit they need, but also strengthens your role as a trusted provider in their journey.</p>
                    <br/>

                    <p>We’ve set up your account and you’re all ready to get started. Over the coming days, we’ll share updates and best practices to help you make the most of your experience on the platform. Together, we can create meaningful impact—unlocking opportunities, building trust, and ensuring that farmers have the support they need to grow.</p>
                    <br/>

                    <p>Thank you for taking this important step with us. We look forward to a strong partnership and the success we’ll achieve together.</p>
                    <br/>

                    <p>Warm Regards</p>,
                    <p>– The uFarmX Team</p>`
          },
        },
        Subject: {
          Data: "Welcome to UfarmX – Empowering Farmers Together",
        },
      },
      Source: 'info@ufarmx.com'//process.env.SES_FROM_EMAIL, // must be a verified SES sender
    };

    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    console.log("✅ Email sent successfully:", response.MessageId);
    return response;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
});



const updateProduce = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {newFarmer} = req.body
 console.log('WE ARE IN BACKEND FOR PRODUCE UPDATE-->',req.body)
  const objectId = new mongoose.Types.ObjectId(req.body._id)
  const product= await Product.findById(objectId)

   if(product){
    product.name = req.body.name?req.body.name:product.name
     product.localPrice = req.body.localPrice?req.body.localPrice:product.localPrice
     product.nextHarvestDate = req.body.nextHarvestDate?req.body.nextHarvestDate:product.nextHarvestDate
     product.nextHarvestQuantity =  req.body.nextHarvestQuantity?req.body.nextHarvestQuantity:product.nextHarvestQuantity
     product.unitQuantity  = req.body.unitQuantity?req.body.unitQuantity:product.unitQuantity

     console.log('FOR THE product WE FOUND TO UPDATE INPUTS, INPUTS ARE-->',product)
     const updatedProduce = await product.save()
     console.log('WE HAVE SAVED UPDATED PRODUCT PRICE-->')
     res.status(201).json(
      {
        message:"success",
      productInfo:updatedProduce
      }
     )
   }else{
     res.status(404)
     throw new Error('Product to update not found')
   }

})


//const  oldaddProduce = asyncHandler(async (req,res)=>{
//  res.header("Access-Control-Allow-Origin","*")
//  const {newFarmer} = req.body
// console.log('WE ARE IN BACKEND FOR PRODUCE ADD-->',req.body)
//  const objectId = new mongoose.Types.ObjectId(req.body._id)
//  const product= await Product.findById(objectId)
//
//   if(product){
//     product.localPrice = req.body.localPrice?req.body.localPrice:product.localPrice
//     product.nextHarvestDate = req.body.nextHarvestDate?req.body.nextHarvestDate:product.nextHarvestDate
//     product.nextHarvestQuantity =  req.body.nextHarvestQuantity?req.body.nextHarvestQuantity:product.nextHarvestQuantity
//     product.unitQuantity  = req.body.unitQuantity?req.body.unitQuantity:product.unitQuantity
//
//     console.log('FOR THE product WE FOUND TO UPDATE INPUTS, INPUTS ARE-->',product)
//     const updatedProduce = await product.save()
//     console.log('WE HAVE SAVED UPDATED PRODUCT PRICE-->')
//     res.status(201).json(
//      {
//        message:"success",
//      productInfo:updatedProduce
//      }
//     )
//   }else{
//     res.status(404)
//     throw new Error('Product to update not found')
//   }
//
//})


//@desc  Fetch all retailers in one go
//@route GET /api/retailers/all
//@access Public
const getRetailersForOneAgent = asyncHandler(async (req,res)=>{

  res.header("Access-Control-Allow-Origin","*")
  const pageSize = 10 //i recommend 4 per page,cuz of whats in the frontend
     const page = Number(req.query.pageNumber) || 1


let count;
let retailers;


 
  console.log("AGENT ID I AM GETTING IS-->",req.query.agentId )

count = await Retailer.countDocuments({agent_user_id:new mongoose.Types.ObjectId(req.query.agentId) }),
retailers = await Retailer.find({agent_user_id:new mongoose.Types.ObjectId(req.query.agentId)}) /*.limit(pageSize).skip(pageSize *(page-1))*/ /**watch for if the retailers fetching will slow the dbs */

console.log("retailers FOR THIS AGENT is --->",retailers)

console.log("count of retailer docs FOR THIS AGENT IS is --->",count)



  res.json({retailers,page,pages:Math.ceil(count/pageSize)})
})


const addProduce = asyncHandler(async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  console.log("WE ARE IN BACKEND FOR PRODUCE ADD -->", req.body);

  const { nextHarvestDate, nextHarvestQuantity, localPrice, name, unitQuantity } = req.body;

  // Create a new produce entry
  const newProduce = new Product({
    nextHarvestDate,
    nextHarvestQuantity,
    localPrice,
    name,
    unitQuantity
  });

  try {
    const savedProduce = await newProduce.save();
    console.log("NEW PRODUCE ADDED SUCCESSFULLY -->", savedProduce);

    res.status(201).json({
      message: "success",
      productInfo: savedProduce,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to add produce", error: error.message });
  }
});



//@desc  Fetch single product
//@route GET /api/products/:id
//@access Publiccount
const getProductById = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product = await Product.findById(objectId)
  if(product){res.json(product)}
   else{ res.status(404) /*with the custom error handler, if you dont put a res.status, it'll be 500 by default, and you don't have to res.json anymore, it'll just be handled, if yo throw a new error ? please study error handlers */
   throw new Error('Product not found')}
})


//@desc  Delete a product
//@route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const objectId = new mongoose.Types.ObjectId(req.body.productId)
  const product = await Product.findById(objectId)
  if(product){
    await product.remove()
    res.json({message:'success'})
                                    }
   else{ res.status(404) /*with the custom error handler, if you dont put a res.status, it'll be 500 by default, and you don't have to res.json anymore, it'll just be handled, if yo throw a new error ? please study error handlers */
   throw new Error('Product not found')}
})







//@desc  Create a product
//@route POST /api/products
//@access Private/Admin
const createProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
   const product = new Product({
     name: 'Sample name',
     stageName:'Sample Name',
     size:'small',
     price: 0,
     outsidePrice:0,
     agreedPrice:0,
     user:req.user._id,
     image:'/images/sample.jpeg',
     brand:"Sample brand",
     category:'Sample category',
     countInStock:0,
     numReviews:0, /*is it reviews or num reviews  */
     description:'Sample Description',
     vendor:'Sample Vendor',
     vendorId:'none',
     vendorAddress:'no address',
     vendorAccountNumber: '0000000000'
   })

   const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})


//@desc  update a product
//@route PUT /api/products/:id
//@access Private/Admin
const updateProduct = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {name,stageName,outsidePrice,agreedPrice,price,description,brand,image,size,countInStock,vendor,vendorId,vendorAddress, vendorAccountNumber} = req.body

  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product= await Product.findById(objectId)

   if(product){
      product.name = name
      product.stageName = stageName
      product.outsidePrice = outsidePrice
      product.agreedPrice = agreedPrice
      product.price  = (price*1).toFixed(2)
      product.description=description
      product.vendor= vendor
      product.vendorId= vendorId
      product.vendorAddress = vendorAddress
      product.vendorAccountNumber = vendorAccountNumber
      product.size = size
      product.brand = brand
      product.countInStock = countInStock
      product.image = image

     const updatedProduct = await product.save()
     res.status(201).json(updatedProduct)
   }else{
     res.status(404)
     throw new Error('Product not found')
   }

})


//@desc  update a products' count in stock because an order was made
//@route PUT /api/products/ordermade
//@access Public
const updateProductStockCount = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {productIdArray,qtyArray} = req.body
    
  console.log(productIdArray,qtyArray)

 for(let i= 0;i < productIdArray.length;i++){
  const objectId = new mongoose.Types.ObjectId(productIdArray[i])
  const product = await Product.findById(objectId)
  
   await Product.findOneAndUpdate({_id:objectId},{$set:{countInStock: product.countInStock-qtyArray[i] }}, { useFindAndModify: false})
  
     } 
   

})





//@desc  Create new review
//@route POST /api/products/:id/review
//@access Private/Admin
const createProductReview = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  const {rating,comment} = req.body
  console.log(req.body)
  console.log(req.user.name)
  
  const objectId = new mongoose.Types.ObjectId(req.params.id)
  const product= await Product.findById(objectId)

   if(product){
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

      if(alreadyReviewed){
        res.status(400)
        throw new Error('Product already reviewed')}
         
        let numberRating 

        switch(rating){
          case'1': numberRating = 1
          break;
          case'2': numberRating = 2
          break;
          case'3': numberRating = 3
          break;
          case'4': numberRating = 4
          break;
          case'5': numberRating = 5
          default:5
        }

      const review ={
        name:req.user.name,
        comment,
        rating:Number(req.body.rating),
        user:req.user._id
      }

      product.reviews.push(review)
      product.numReviews = product.reviews.length
      const formingNewAverage = product.reviews.map((item) =>{item.rating})

      /*consider changing this check to not use == , but rather ===*/ 
      product.rating = formingNewAverage==false?Number(rating):Number(formingNewAverage.reduce((acc,item) =>{item + acc},0)/product.reviews.length)
      console.log(formingNewAverage)
      await product.save()

      res.status(201).json({message:'Review added'})

   }else{
     res.status(404)
     throw new Error('Product not found')
   }

})
 

//@desc  Get top rated products
//@route GET /api/products/top
//@access Public
const getTopProducts = asyncHandler(async (req,res)=>{
   res.header("Access-Control-Allow-Origin","*")
  const products = await Product.find({}).sort({rating:-1}).limit(3)
  res.json(products)
})



//@desc  Get all rated products
//@route GET /api/products/all
//@access Public
const getAllRetailerProducts = asyncHandler(async (req,res)=>{
  res.header("Access-Control-Allow-Origin","*")

  console.log("WE ARE IN  RETAILER PRODUCT CONTROLLER")

 const products = await RetailerProduct.find({})

 console.log(" RETAILER PRODUCTS FOUND FROM DB INCLUDE-->",products)
 res.json(products)
})



export {sendWelcomeEmail,getRetailers,getRetailersForOneAgent,addNewRetailer,getProducts, getProductById,deleteProduct, createProduct,addProduce,updateProduce, updateProduct, updateProductStockCount, createProductReview ,getTopProducts,getAllRetailerProducts}
//exports.getProducts = getProducts
//exports.getProductById = getProductById
//exports.deleteProduct = deleteProduct
//exports.createProduct = createProduct
//exports.updateProduct = updateProduct
//exports.createProductReview = createProductReview
//exports.getTopProducts = getTopProducts