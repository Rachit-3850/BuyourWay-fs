const Product = require('../models/products.js');
const ErrorHandler = require('../utils/errorHandler.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors.js')
const APIFeatures = require('../utils/apiFeatures.js');
const products = require('../models/products.js');

exports.newProduct = catchAsyncErrors( async (req , res ,next) => {
    req.body.user = req.user.id;
    const products = await Product.create(req.body);

    res.status(201).json({
        success: true,
        products
    })
})

exports.getProducts = catchAsyncErrors(async (req , res , next) => {
    // console.log(req.query);
    const noOfPages = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(noOfPages)

    // let products = await apiFeatures.query;
    // let filteredProductsCount = 0;

    // apiFeatures.pagination(noOfPages)
    let products = await apiFeatures.query;
    
    // apiFeatures = new APIFeatures(Product.find(), req.query)
    //     .pagination(noOfPages);
    // let filteredProductsCount = products.length;
    // products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        resPerPage : noOfPages,
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, 
        {
            new: true , 
            runValidators: true,
            useFindAndModify: false
        });
    
    if(!product) {
        return next(new ErrorHandler('Product not found' , 404))
    }
    
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
    
    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})

//review routes
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body;
    console.log("rating");  
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
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


// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    // console.log(product);

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