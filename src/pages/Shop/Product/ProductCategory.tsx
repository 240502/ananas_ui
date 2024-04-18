import React from 'react';
import { toggleNav } from '../../../utils/product';
import { useEffect, useState } from 'react';
import { getCategories } from '../../../services/product.servies';

export const ProductCategory = ({ setCateId }: any) => {
    const [indexCate, setIndexCate] = useState(0);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function loadData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        }
        loadData();
    }, []);
    return (
        <li className="first-lv1 open">
            <button type="button" className="tree-title" onClick={toggleNav}>
                Dòng sản phẩm
                <i className="fa-solid fa-angle-down" />
            </button>
            <ul className=" tree">
                {categories.map((category): any => {
                    return (
                        <li
                            key={category['id']}
                            className={indexCate == category['id'] ? 'active' : ''}
                            onClick={() => {
                                setIndexCate(category['id']);
                                setCateId(category['id']);
                            }}
                        >
                            <input value={category['cate_name']}></input>
                        </li>
                    );
                })}
            </ul>
        </li>
    );
};
