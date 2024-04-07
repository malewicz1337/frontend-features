import { useEffect, useState } from "react";
import "./App.css";

interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productsPerPage = 12;

  const fetchProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data && data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.warn("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage: number) => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    return [...Array(totalPages)].map((_, i) => (
      <span key={i} className={page === i + 1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i + 1)}>
        {i + 1}
      </span>
    ));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main>
      {products.length > 0 && (
        <section className="products">
          {products.slice(page * productsPerPage - productsPerPage, page * productsPerPage).map((prod) => (
            <span className="products__single" key={prod.id}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </span>
          ))}
        </section>
      )}

      {products.length > 0 && (
        <section className="pagination">
          <span onClick={() => selectPageHandler(page - 1)} className={page > 1 ? "" : "pagination__disable"}>
            ◀
          </span>

          {renderPagination()}

          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / productsPerPage ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </section>
      )}
    </main>
  );
}

export default App;
