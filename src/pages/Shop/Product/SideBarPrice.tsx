import React from 'react';
import { toggleNav } from '../../../utils/product';
import { useEffect, useState } from 'react';
export const SideBarPrice = ({ setStartPrice, setEndPrice, setPage }: any) => {
    const [indexPrice, setIndexPrice] = useState(0);

    return (
        <li className="first-lv1 open">
            <button type="button" className="tree-title" onClick={toggleNav}>
                Giá
                <i className="fa-solid fa-angle-down" />
            </button>
            <ul className=" tree">
                <li
                    className={indexPrice == 1 ? 'active' : ''}
                    key={1}
                    onClick={() => {
                        setIndexPrice(1);
                        setStartPrice(600000);
                        setEndPrice(700000);
                        setPage(1);
                    }}
                >
                    <input value=" 600k - 700k"></input>
                </li>
                <li
                    className={indexPrice == 2 ? 'active' : ''}
                    key={2}
                    onClick={() => {
                        setIndexPrice(2);
                        setStartPrice(700000);
                        setEndPrice(900000);
                        setPage(1);
                    }}
                >
                    <input value="700k - 900k"></input>
                </li>
                <li
                    className={indexPrice == 3 ? 'active' : ''}
                    key={3}
                    onClick={() => {
                        setIndexPrice(3);
                        setStartPrice(900000);

                        setEndPrice(0);
                    }}
                >
                    <input value="> 900k"></input>
                </li>
            </ul>
        </li>
    );
};
