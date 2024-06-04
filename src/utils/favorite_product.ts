import { FavoriteProductType, ProductType } from '../types';

export const handleAddAndRemoveFavoriteProduct = (
    product: ProductType,
    color_name: string,
    style: any,
    listFavorite: FavoriteProductType[],
    setFavorite: any,
) => {
    let newListFavorite;
    if (listFavorite.length > 0) {
        const favoriteProduct: any = listFavorite.find((item: FavoriteProductType) => {
            if (item.id === product.id) {
                return item;
            }
        });
        if (favoriteProduct) {
            newListFavorite = listFavorite.filter((item: FavoriteProductType) => item.id !== product.id);
            setFavorite(newListFavorite);
        } else {
            const newFavoriteProduct = { ...product, color_name: color_name, style_name: style['name_style'] };
            newListFavorite = [...listFavorite, newFavoriteProduct];
            setFavorite(newListFavorite);
        }
    } else {
        const newFavoriteProduct = { ...product, color_name: color_name, style_name: style['name_style'] };

        newListFavorite = [newFavoriteProduct];
        setFavorite(newListFavorite);
    }
    localStorage.setItem('favorite_products', JSON.stringify(newListFavorite));
};

export const handleRemoveFavoriteProduct = (proId: number, listFavorite: FavoriteProductType[], setFavorite: any) => {
    let newListFavorite = listFavorite.filter((item: ProductType) => item.id !== proId);
    setFavorite(newListFavorite);
};
