import SlickSlideProductDetail from '../../../components/Layout/SlickSlide/SlickSlideProductDetail';
import SlickSlideProductRef from '../../../components/Layout/SlickSlide/SlickSlideProductRef';
import { toggleInfo } from '../../../utils/product-detail';
import SlickSlideProductViewed from '../../../components/Layout/SlickSlide/SlickSlideProductViewed';
import '../../../assets/css/Shop/product_detail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    getProductById,
    getColor,
    getListSizeByProId,
    getProductStatus,
    getStyleById,
    getProDetailByProIdAndSize,
    getRelatedProduct,
} from '../../../services/product-detail.service';
import { getProductPrice } from '../../../services/product.servies';
import ProductImage from './ProductImage';
import { BreadCrumb } from './BreadCrumb';
import { useRecoilState } from 'recoil';
import { cartState, sizeState } from '../../../store/cart.atom';
import { addToCart } from '../../../utils/cart';
type DataParams = {
    id: string;
};
function ProductDetail() {
    const { id } = useParams<DataParams>();
    const [color, setColor] = useState({ id: 0, color_name: '', color_code: '' });
    const [details, setProDetail] = useState([]);
    const [price, setPrice] = useState({ id: 0, price: 0 });
    const [status, setStatus] = useState({ id: 0, status_name: '' });
    const [style, setStyle] = useState({ id: 0, name_style: '' });
    const [size, setSize] = useState(0);
    const [detail, setDetail] = useState({ id: 0, quantity: 1 });
    const [img, setImage] = useState({ id: 0, img_src: '' });
    const [quantity, setNumberPro] = useState(0);
    const [cart, setCart] = useRecoilState(cartState);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [product, setProduct] = useState({
        id: 0,
        pro_name: '',
        color_id: 0,
        style_id: 0,
        cate_id: 0,
        status_id: 0,
        out_sole: '',
        gender: '',
        material_id: 0,
        collection_id: 0,
    });
    const handleChangeSize = (event: any) => {
        setSize(event.target.value);
    };
    const handleChangeNumber = (event: any) => {
        setNumberPro(event.target.value);
    };
    useEffect(() => {
        async function getProDetail(proId: any, size: any) {
            if (size > 0) {
                const pro = await getProDetailByProIdAndSize(proId, size);
                setDetail(pro);
            }
        }
        getProDetail(id, size);
    }, [size]);
    renderListNumberPro();
    function renderListNumberPro() {
        if (detail.quantity > 1) {
            var selectElement = document.getElementById('select_number');
            for (let index = 1; index <= detail.quantity; index++) {
                let option = document.createElement('option');
                option.innerHTML = `${index}`;
                option.setAttribute('value', `${index}`);
                selectElement?.appendChild(option);
            }
        }
    }

    useEffect(() => {
        async function getProduct(id: any) {
            const product = await getProductById(id);
            setProduct(product);
        }
        async function getProductDetail(proId: any) {
            let price = await getProductPrice(proId);
            setPrice(price);
        }
        async function getSize(proId: any) {
            const res = await getListSizeByProId(proId);
            try {
                setProDetail(res);
            } catch (err) {
                console.log(err);
            }
        }
        getProduct(id);
        getProductDetail(id);
        getSize(id);
    }, [id]);
    useEffect(() => {
        async function getRelated(cateId: any, styleId: any, collectionId: any, gender: any) {
            if (product.id > 0) {
                let items = await getRelatedProduct({
                    cateId: cateId,
                    styleId: styleId,
                    collectionId: collectionId,
                    gender: gender,
                    id:product.id
                });
                setRelatedProducts(items);
            }
        }getRelated(product.cate_id,product.style_id,product.collection_id,product.gender)
    }, [product.id]);
    useEffect(() => {
        async function getColorById(id: any) {
            if (id !== 0) {
                const res = await getColor(id);
                try {
                    setColor(res);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        async function getProductStatusById(id: any) {
            if (id != 0) {
                const status = await getProductStatus(id);
                try {
                    setStatus(status);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        async function getStyle(id: any) {
            if (id != 0) {
                const style = await getStyleById(id);
                try {
                    setStyle(style);
                } catch (err) {
                    console.log(err);
                }
            }
        }
        getStyle(product.style_id);
        getProductStatusById(product.status_id);
        getColorById(product.color_id);
    }, [product.id]);
    return (
        <main>
            <div className="container product-detail">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 hidden-xs hidden-sm">
                        <BreadCrumb proName={product.pro_name} cateId={product.cate_id} style={style.name_style} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7">
                        <ProductImage proId={id} setImage={setImage} image={img} />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 prd-detail-right">
                        <h4 className="pro-name">
                            {product.pro_name} - {style.name_style} - {color.color_name}{' '}
                        </h4>
                        <div className="detail">
                            <span className="pull-left col">
                                Mã sản phẩm:<strong> {id}</strong>
                            </span>
                            <span
                                className="pull-right col"
                                style={{ display: `${product.status_id != 0 ? 'block' : 'none'}` }}
                            >
                                Tình trạng: {status.status_name}
                            </span>
                        </div>
                        <div className="detail">
                            <h3 className="price">{price.price.toLocaleString(undefined)} VNĐ</h3>
                        </div>
                        <div className="divider" />
                        <div className="color">
                            <h5>Màu sắc</h5>
                            <ul>
                                <li>
                                    <label htmlFor="">
                                        <span className="bg-color" style={{ backgroundColor: `${color.color_code}` }} />
                                        <input type="checkbox" name="cbColor" hidden />
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="divider" />
                        <div className="row">
                            <div className="col">
                                <h5>size</h5>
                                <select
                                    name=""
                                    id=""
                                    className=" form-select selectpicker bs-select-hidden"
                                    onChange={handleChangeSize}
                                >
                                    <option value={0}>Chọn size</option>
                                    {details.map((detail) => {
                                        return <option value={detail['size']}>{detail['size']}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="col">
                                <h5>Số lượng</h5>
                                <select
                                    onChange={handleChangeNumber}
                                    name=""
                                    id="select_number"
                                    className=" form-select selectpicker bs-select-hidden"
                                >
                                    <option value={0}>Chọn số lượng</option>
                                </select>
                            </div>
                        </div>
                        <div className="row group-btn1">
                            <button
                                type="button"
                                className="  btn btn-addcart "
                                onClick={() => {
                                    addToCart(
                                        product.id,
                                        product.pro_name,
                                        style.name_style,
                                        color.color_name,
                                        price.price,
                                        Number(size),
                                        detail.quantity,
                                        Number(quantity),
                                        img,
                                        details,
                                    );
                                    let list = JSON.parse(localStorage.getItem('cart') || '[]');
                                    setCart(list);
                                }}
                            >
                                Thêm vào giỏ hàng
                            </button>
                            <button type="button" className=" btn btn-like">
                                <i className="fa-regular fa-heart" style={{ color: '#f15e2c', fontSize: 24 }} />
                            </button>
                        </div>
                        <div className="row group-btn2">
                            <button className="btn btn-payment">Thanh toán</button>
                        </div>
                        <div className="panel-group">
                            <div className="panel open">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Thông tin sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <h6 className="gender">
                                        Gender: <span style={{ textTransform: 'capitalize' }}>{product.gender}</span>
                                    </h6>
                                    <h6 className="size-run">
                                        Size run: <span>35 - 46</span>
                                    </h6>
                                    <h6 className="upper">
                                        Upper: <span>Canvas</span>
                                    </h6>
                                    <h6 className="outsole">
                                        Outsole: <span style={{ textTransform: 'capitalize' }}>{product.out_sole}</span>
                                    </h6>
                                    <div className="size-table">
                                        <img src="/img/Ananas_SizeChart.jpg" />
                                    </div>
                                    <div className="divider" />
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Quy định đổi sản phẩm
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <ul>
                                        <li>Chỉ đổi hàng 1 lần duy nhất, mong bạn cân nhắc kĩ trước khi quyết định.</li>
                                        <li>
                                            Thời hạn đổi sản phẩm khi mua trực tiếp tại cửa hàng là 07 ngày, kể từ ngày
                                            mua. Đổi sản phẩm khi mua online là 14 ngày, kể từ ngày nhận hàng.
                                        </li>
                                        <li>
                                            Sản phẩm đổi phải kèm hóa đơn. Bắt buộc phải còn nguyên tem, hộp, nhãn mác.
                                        </li>
                                        <li>
                                            Sản phẩm đổi không có dấu hiệu đã qua sử dụng, không giặt tẩy, bám bẩn, biến
                                            dạng.
                                        </li>
                                        <li>
                                            Ananas chỉ ưu tiên hỗ trợ đổi size. Trong trường hợp sản phẩm hết size cần
                                            đổi, bạn có thể đổi sang 01 sản phẩm khác:
                                            <br />
                                            - Nếu sản phẩm muốn đổi ngang giá trị hoặc có giá trị cao hơn, bạn sẽ cần bù
                                            khoảng chênh lệch tại thời điểm đổi (nếu có).
                                            <br />- Nếu bạn mong muốn đổi sản phẩm có giá trị thấp hơn, chúng tôi sẽ
                                            không hoàn lại tiền.
                                        </li>
                                        <li>
                                            Trong trường hợp sản phẩm - size bạn muốn đổi không còn hàng trong hệ thống.
                                            Vui lòng chọn sản phẩm khác.
                                        </li>
                                        <li>
                                            Không hoàn trả bằng tiền mặt dù bất cứ trong trường hợp nào. Mong bạn thông
                                            cảm.
                                        </li>
                                    </ul>
                                    <div className="divider" />
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h3 className="panel-title" onClick={() => toggleInfo()}>
                                        Bảo hành thế nào?
                                        <i className="fa-solid fa-angle-down" />
                                    </h3>
                                </div>
                                <div className="divider" />
                                <div className="panel-body">
                                    <p>
                                        Mỗi đôi giày Ananas trước khi xuất xưởng đều trải qua nhiều khâu kiểm tra. Tuy
                                        vậy, trong quá trình sử dụng, nếu nhận thấy các lỗi: gãy đế, hở đế, đứt chỉ
                                        may,...trong thời gian 6 tháng từ ngày mua hàng, mong bạn sớm gửi sản phẩm về
                                        Ananas nhằm giúp chúng tôi có cơ hội phục vụ bạn tốt hơn. Vui lòng gửi sản phẩm
                                        về bất kỳ cửa hàng Ananas nào, hoặc gửi đến trung tâm bảo hành Ananas ngay trong
                                        trung tâm TP.HCM trong giờ hành chính:
                                    </p>
                                    <p>
                                        Địa chỉ: 5C Tân Cảng, P.25, Q.Bình Thạnh , TP. Hồ Chí Minh.
                                        <br />
                                        Hotline: 028 2211 0067
                                    </p>
                                    <div className="divider" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="row  related-product">
                    <div className="container">
                        <h3 className="heading ">Sản phẩm liên quan</h3>
                        <div className="pro-list">
                            <SlickSlideProductRef data = {relatedProducts} />
                        </div>
                    </div>
                </div>
                <div className="divider" />
                <div className="row  product-viewed">
                    <div className="container">
                        <h3 className="heading ">Sản phẩm đã xem</h3>
                        <div className="pro-list">
                            <SlickSlideProductViewed />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetail;
