import './product.css';
import {Link} from "react-router-dom";
import { Chart } from '../../components/charts/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@material-ui/icons';
import QueryParams from '../../QueryParams';

export default function Product() {
    const query=QueryParams();
    
    const storeid=query.get('storeId');
    const storename=query.get('storeName');
    const productid=query.get('productId');

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/dashboard/newproduct">
                <button className="productAddButon">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={productData} datakey="Sales" title="Sales Performance"/>
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src="https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" className="productInfoImg" />
                       <span className="productName">Apple Airpods</span>
                    </div>
                    <div className="productInfoBottom">
                        <span className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">123</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">sales</span>
                            <span className="productInfoValue">5123</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">active</span>
                            <span className="productInfoValue">yes</span>
                        </span>
                        <span className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">no</span>
                        </span>
                    </div>
                    </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder="Apple Airpod"/>
                        <label>In Stock</label>
                        <select name="inStock" id="" className="inStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select> <label>Active</label>
                        <select name="active" id="" className="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src="https://images.pexels.com/photos/4620866/pexels-photo-4620866.jpeg?cs=srgb&dl=pexels-cottonbro-4620866.jpg&fm=jpg" alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish/>
                            </label>
                            <input type="file" id="file" style={{display:"none"}} />
                        </div>
                        <button className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}