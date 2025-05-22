import { useSearchParams } from "react-router-dom";
import { ProductList } from '../components/ProductList';
import { Nav } from "../Navigation/Navigation";
import { getProducts } from '../fakeApi';

export default function Products() {
  const products = getProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const productName = searchParams.get("name") ?? "";

  const visibleProducts = products.filter((product) =>
    product.name.toLowerCase().includes(productName.toLowerCase())
  );

  const updateQueryString = (name) => {
    const nextParams = name !== "" ? { name } : {};
    setSearchParams(nextParams);
  };

  return (
    <main>
      <Nav value={productName} onChange={updateQueryString} />
      <ProductList products={visibleProducts} />
    </main>
  );
}
