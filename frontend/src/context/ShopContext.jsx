import { useEffect, useState, useCallback } from "react";
import { products as prod } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BACKEND_URL } from "../util/URL";
import { ShopContext } from "./ShopCreateContext";
import PropTypes from 'prop-types';




const ShopContextProvider = (props) => {
    
    const currency = '$';
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProductsData] = useState([]);
    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        getProductsData();
    }, []);

    const getProductsData = async () => {
        try {
            setProductsData(prod);
            const response = await axios.get(`${BACKEND_URL}/api/product/list`);
            if (response.data.products) {
                setProductsData(prev => [...prev, ...response.data.products]);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const getCart = useCallback(async () => {
        if (!token) return;

        try {
            const response = await axios.post(`${BACKEND_URL}/api/cart/getcart`, {}, {
                headers: { token }
            });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.error(error?.response?.data?.message || error.message);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            getCart();
        }
    }, [token, getCart]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size");
            return;
        }
        const cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        } else {
            cartData[itemId] = { [size]: 1 };
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(`${BACKEND_URL}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const delivery_fee = 10;

    const getCartCount = () => {
        let count = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId]) {
                for (const size in cartItems[itemId]) {
                    const qty = cartItems[itemId][size];
                    if (qty > 0) {
                        count += qty;
                    }
                }
            }
        }
        return count;
    };

    const updateCartItemQty = async (itemId, size, qty) => {
        const cartCopy = structuredClone(cartItems);
        if (!cartCopy[itemId]) return;
        cartCopy[itemId][size] = qty;
        setCartItems(cartCopy);

        if (token) {
            try {
                const response = await axios.post(`${BACKEND_URL}/api/cart/update`, { itemId, size, qty }, { headers: { token } });
                if (!response.data.success) {
                    toast.error(response.data.message || "Failed to update cart");
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const product = products.find(p => p._id === itemId);
            if (!product) continue;
            for (const size in cartItems[itemId]) {
                const qty = cartItems[itemId][size];
                if (qty > 0) {
                    totalAmount += product.price * qty;
                }
            }
        }
        return totalAmount;
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        setCartItems,
        updateCartItemQty,
        getCartAmount,
        navigate,
        token,
        setToken,
        loggedIn,
        setLoggedIn,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

ShopContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ShopContextProvider;
