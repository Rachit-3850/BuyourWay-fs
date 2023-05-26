class APIFeatures {
    constructor(query , queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ? { 
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        console.log(keyword);
          
        this.query = this.query.find({...keyword});
        return this;  
    }

    filter() {
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);

        const removeFields = ['keyword', 'limit', 'page']; 
        removeFields.forEach(param => delete queryCopy[param]);
    
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(queryStr)) ;
        return this;
    }

    pagination(noOfPages) {
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy);
        const currentPage = Number(queryCopy.page) || 1;
        // console.log(currentPage);
        const skip = noOfPages * (currentPage - 1);

        this.query = this.query.limit(noOfPages).skip(skip);
        return this;  
    }
}
module.exports = APIFeatures;