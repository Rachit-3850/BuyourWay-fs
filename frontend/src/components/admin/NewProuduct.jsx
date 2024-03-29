import React, { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { newProduct , clearErrors} from "../../actions/prouductActions";
import { Fragment } from "react";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'

const NewProuduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {

        if (error) {
            alert(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate("/admin/products")
            alert('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, error, success])

    const submitHandler = (e) => {
        e.preventDefault();
        if(name.length === 0 || price.length === 0 || description.length === 0 || category.length === 0 || stock.length === 0 || seller.length === 0 || images.length === 0) {
            alert("all fields are required");
            return ;
        }
        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('images' ,  JSON.stringify(images));


        dispatch(newProduct(formData))
    }

    const onChange = e => {

        const files = Array.from(e.target.files)
        console.log(files);
        setImagesPreview([]);
        setImages([])
        

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old)=>[...old, reader.result])
                    setImages((old)=>[...old, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })
    }

  return (
    <Fragment>
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10">
            <Fragment>
                <div className="wrapper my-5">
                    <form className="shadow-lg bg-white w-75" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-4">New Product</h1>

                        <div className="form-group">
                            <label className="my-2" htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="my-2" htmlFor="price_field">Price</label>
                            <input
                                type="text"
                                id="price_field"
                                className="form-control"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="my-2" htmlFor="description_field">Description</label>
                            <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div className="form-group">
                            <label className="my-2" htmlFor="category_field">Category</label>
                            <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                {categories.map(category => (
                                    <option key={category} value={category} >{category}</option>
                                ))}

                            </select>
                        </div>
                        <div className="form-group">
                            <label className="my-2" htmlFor="stock_field">Stock</label>
                            <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="my-2" htmlFor="seller_field">Seller Name</label>
                            <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label className="my-2">Images</label>

                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='product_images'
                                    className='custom-file-input'
                                    id='customFile'
                                    onChange={onChange}
                                    multiple
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Images
                             </label>
                            </div>

                            {imagesPreview.map(img => (
                                <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />
                            ))}

                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                           
                        >
                            CREATE
                        </button>

                    </form>
                </div>
            </Fragment>
        </div>
    </div>

</Fragment>
  )
}

export default NewProuduct