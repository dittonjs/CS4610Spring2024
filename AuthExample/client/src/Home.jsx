import {Link} from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div>
        <h1>I am on the home page!</h1>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/sign_up">Sign Up</Link>
        </div>
      </div>
    </>
  )
}