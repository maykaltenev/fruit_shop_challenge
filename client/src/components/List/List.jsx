import React, { useState, useEffect } from "react";
import getAllProducts from "../../hooks/fetcher/getAllProducts.jsx";

const List = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setData(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <ul>
          {data?.map((product, i) => (
            <li key={i}>{product?.name}</li>
          ))}
        </ul>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default List;
