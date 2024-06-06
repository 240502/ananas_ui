export type ImageGalleryType = {
    id: number;
    img_src: string;
    product_id: number;
    feature: boolean;
};

export type ProductPriceType = {
    id: number;
    price: number;
    product_id: number;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
};
export type ProductDetailType = {
    id: number;
    quantity: number;
    size: number;
    product_id: number;
};
export type ProductStatisticsType = {
    id: number;
    pro_name: string;
    color_id: number;
    style_id: number;
    cate_id: number;
    status_id: number;
    out_sole: string;
    gender: string;
    material_id: number;
    collection_id: number;
    created_at: string;
    imageGallery: ImageGalleryType;
    priceModel: ProductPriceType;
    productDetails: ProductDetailType[];
    amountOfSale: number;
    amount_view: number;
};
export type ProductType = {
    id: number;
    pro_name: string;
    color_id: number;
    style_id: number;
    cate_id: number;
    status_id: number;
    out_sole: string;
    gender: string;
    material_id: number;
    collection_id: number;
    created_at: string;
    imageGallery: ImageGalleryType;
    priceModel: ProductPriceType;
    productDetails: ProductDetailType[];
};
export type ProductCategoryType = {
    id: number;
    cate_name: string;
    created_at: string;
    updated_at: string;
};

export type UsersType = {
    id: number;
    password: string;
    role: number;
    active: boolean;
    us_name: string;
    email: string;
    phone_number: string;
    birthday: string;
    created_at: string;
    updated_at: string;
    province: string;
    district: string;
    ward: string;
    token: string;
};
export type OrderDetailsType = {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
    price: number;
    size_id: number;
    color_id: number;
    style_id: number;
};
export type OrderType = {
    id: number;
    user_id: number;
    receiving_address: string;
    phone_number: string;
    money_total: number;
    order_date: string;
    update_at: string;
    status_id: number;
    paymentType_id: number;
    shippingType_id: number;
    email: string;
    full_name: string;
    orderDetails: OrderDetailsType[];
    totalProduct: number;
};

export type ShippingType = {
    id: number;
    shippingType_name: string;
    price: number;
};

export type PaymentType = {
    id: number;
    paymentType_name: string;
    price: number;
    thumbnail: string;
};

export type CartItemType = {
    id: number;
    name: string;
    qty: number;
    size: number;
    thumbnail: string;
    colorName: string;
    price: number;
    styleName: string;
    colorId: number;
    styleId: number;
};
export type FavoriteProductType = {
    id: number;
    pro_name: string;
    color_id: number;
    style_id: number;
    cate_id: number;
    status_id: number;
    out_sole: string;
    gender: string;
    material_id: number;
    collection_id: number;
    created_at: string;
    imageGallery: ImageGalleryType;
    priceModel: ProductPriceType;
    productDetails: ProductDetailType[];
    color_name: string;
    style_name: string;
};
