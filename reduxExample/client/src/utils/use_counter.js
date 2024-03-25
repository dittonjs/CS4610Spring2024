import { useDispatch, useSelector } from "react-redux";
import { counter, decrement, increment } from "../store/counter_slice";

export const useCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector(counter)

  function add() {
    dispatch(increment())
  }

  function subtract() {
    dispatch(decrement())
  }

  return {
    count,
    add,
    subtract
  }
}