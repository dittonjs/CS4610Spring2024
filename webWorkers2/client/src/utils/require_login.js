import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const requireLogin = () => {
  const authToken = useSelector(state => state.application.authToken)
  const navigate = useNavigate();
  useEffect(() => {
    if(!authToken) {
      navigate("/login");
    }
  }, [authToken])
}