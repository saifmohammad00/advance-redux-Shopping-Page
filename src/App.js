import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import Notification from './components/UI/Notification';
import { uiActions } from './store/ui-slice';

let isInitial=true;

function App() {
  const dispatch=useDispatch();
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification=useSelector(state=>state.ui.notification);
  useEffect(() => {
    const sendData = async () => {
      dispatch(uiActions.showNotification({
        title:"Sending...",
        status:"pending",
        message:"Sending cart data!"
      }))
      const response = await fetch('https://reactdemo-909dc-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
        method: "PUT",
        body: JSON.stringify(cart),
      })
      if(!response.ok){
         throw new Error("failed to send data");
      }
      dispatch(uiActions.showNotification({
        title:"Success!",
        status:"success",
        message:"Sent cart data successfully!"
      }))
    }
    if(isInitial){
      isInitial=false;
      return;
    }
    sendData().catch(error=>{
      dispatch(uiActions.showNotification({
        title:"Error!",
        status:"error",
        message:"sending cart data failed!"
      }))
    })
  }, [cart,dispatch])
  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
