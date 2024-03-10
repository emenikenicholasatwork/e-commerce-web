"use client"
const { createContext, useState, useContext } = require("react");


const GlobalContext = createContext();
export function GlobalProvider({ children}) {
    const [openCart, setOpenCart] = useState(false)
    const [cartProduct, setCartProduct] = useState([])
    const [cartTotal, setCartTotal] = useState()
    const [cartProductCount, setCartProductCount] = useState([])
    const [userName, setUserName] = useState()
    const [refresh, setRefresh] = useState(false)

    const openOrCloseCart = () =>{
        openCart ? setOpenCart(false) : setOpenCart(true)
    }

    const changeCartProductCount = items =>{
        setCartProductCount(items)
    }

    const changeUserNameState = details =>{
        setUserName(details)
    }

    const changeRefreshState =()=>{
        refresh ? setRefresh(false) : setRefresh(true)
    }

    const changeCartProduct = items =>{
        setCartProduct(items)
    }

    const changeCartTotal = items =>{
        setCartTotal(items)
    }

    return(
        <GlobalContext.Provider value={{
            openOrCloseCart,
            openCart,
            changeCartProduct,
            cartProduct,
            cartTotal,
            changeCartTotal,
            cartProductCount,
            changeCartProductCount,
            refresh,
            changeRefreshState,
            userName,
            changeUserNameState
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobal(){
    return useContext(GlobalContext);
}