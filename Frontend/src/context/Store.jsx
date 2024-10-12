import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import axios from "axios";

const StoreContext = createContext();
const url = "http://localhost:5000";

export const StoreProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [cartItems, setCartItems] = useState({});

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/items/get`);
      setItems(response.data.items);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to add to cart", error);
      }
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const totalCartAmount = () => {
    let totalAmount = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = items.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };
  const totalCartItems = () => {
    let total = 0;
    for (let item in cartItems) {
      if (cartItems[item] > 0) {
        total++;
      }
    }
    return total;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      setToken,
      addToCart,
      removeFromCart,
      totalCartAmount,
      items,
      cartItems,
      totalCartItems,
      url,
    }),
    [token, items, cartItems]
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};

export default StoreProvider;
