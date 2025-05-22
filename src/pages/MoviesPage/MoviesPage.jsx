import { useLocation } from "react-router-dom";

export const Products = () => {
    const location = useLocation();
  
    return (
      <Link to="/product/h-1" state={{ from: location }}>
        Navigate to product h-1
      </Link>
    );
  };