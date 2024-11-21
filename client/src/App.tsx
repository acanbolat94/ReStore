import { useEffect, useState } from "react";

function App() {
  // We use the store to manage the latest state of the data
  const [products, setProducts] = useState(
    [{ name: 'product1', price: 100.00 },
    { name: 'product2', price: 200.00 },
    ]
  );

  // Then we use the us
  useEffect(() => {
    fetch('http://localhost:5000/api/product')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

  function addProducts() {
    // setProducts([...products, { name: "product6", price: 600.00 }])
    setProducts(prevState => [...prevState, { name: 'product' + (prevState.length + 1), price: (prevState.length * 150) }])
  }

  return (
    <div className="container bg-secondary bg-opacity-10">
      <h1 className="h1 my-5">ReStore</h1>
      <div style={{ width: '50%', height: '8px', backgroundColor: '#FECC1B', marginBottom: '32px', borderRadius: '16px' }}></div>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-10 px-3 mb-4">
          <table className="table shadow shadow-lg">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={addProducts}>Add Product</button>
        </div>
      </div>
    </div>
  );
}

export default App;