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
