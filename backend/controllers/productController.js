
const Product = require('../models/products.js');
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const APIFeatures = require('../utils/apiFeatures.js');
const cloudinary = require('cloudinary');
exports.newProduct = catchAsyncErrors( async (req , res ,next) => {

    let images = []
   
    images = JSON.parse(req.body.images);
    let imagesLinks = [];
    // console.log(images.length)
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks

    req.body.user = req.user.id;
    const products = await Product.create(req.body);

    res.status(201).json({
        success: true,
        products
    })
})

exports.getProducts = catchAsyncErrors(async (req , res , next) => {
    const noOfPages = 6;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(noOfPages)

    let products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        resPerPage : noOfPages,
        products
    })
})

exports.getAdminProducts = catchAsyncErrors(async (req ,res , next) => {
    const products = await Product.find();

    res.status(200).json({
            success: true,
            products
        })
})

exports.getSingleProduct = catchAsyncErrors(async (req , res , next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product not found' , 404))
    }
    
    res.status(200).json({
        success: true,
        product
    })
})

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = []
    
    images = JSON.parse(req.body.images);
    if (images !== undefined) {

        // Deleting images associated with the product
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks

    }



    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
    
})

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    
    const product = await Product.findByIdAndRemove(req.params.id);
    
    if(!product) {
        return next(new ErrorHandler('Product not found' , 404))
    }
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    
    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        createdAt: new Date(),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})


exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);


    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const numOfReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})