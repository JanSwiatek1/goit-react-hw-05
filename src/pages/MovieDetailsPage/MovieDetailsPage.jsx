import { useLocation } from "react-router-dom";

export const ProductDetails = () => {
    const location = useLocation();
    const backLinkHref = location.state?.from ?? "/products";

    console.log(location.state);
  
  // /products -> products/h-1
  // { from: { pathname: "/products", search: "" } }
  
  // /products?name=hoodie -> products/h-1
  // { from: { pathname: "/products", search: "?name=hoodie" } }
  
  return <Link to={backLinkHref}>Back to products</Link>;
  };
