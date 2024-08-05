import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice"

export const fetchCartData=()=>{
    return async(dispatch)=>{
        const fetchData=async()=>{
            const response = await fetch('https://reactdemo-909dc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json');
            if(!response.ok){
                throw new Error("fetching data is failed");
            }
            const data=await response.json();
            return data;
        }
        try{
            const cartData=await fetchData();
            dispatch(cartActions.replaceCart({
                items:cartData.items || [],
                totalQuantity:cartData.totalQuantity,
            }));
        }catch(error){
            dispatch(uiActions.showNotification({
                title: "Error!",
                status: "error",
                message: "sending cart data failed!"
            }))
        }

    }
}

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            title: "Sending...",
            status: "pending",
            message: "Sending cart data!"
        }))
        const sendRequest = async () => {
            const response = await fetch('https://reactdemo-909dc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
                method: "PUT",
                body: JSON.stringify({
                    items:cart.items,
                    totalQuantity:cart.totalQuantity,
                }),
            })
            if (!response.ok) {
                throw new Error("failed to send data");
            }
        }
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                title: "Success!",
                status: "success",
                message: "Sent cart data successfully!"
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                title: "Error!",
                status: "error",
                message: "sending cart data failed!"
            }))
        }
    }
}