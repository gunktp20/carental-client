import { Navigate } from "react-router-dom";

function HandlerNotFound() {
  return <Navigate to="/" />;
}

export default HandlerNotFound;
