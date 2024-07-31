import { useDispatch } from 'react-redux';
import classes from './CartButton.module.css';
import { cartActions } from '../../store';

const CartButton = (props) => {
  const dispatch=useDispatch();
  const handleCart=()=>{
    dispatch(cartActions.toggle());
  }
  return (
    <button className={classes.button} onClick={handleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
