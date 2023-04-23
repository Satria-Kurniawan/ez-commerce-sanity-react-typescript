import { Box, Grid } from "@mui/material";
import Product from "./Product/Product";
import { useEffect, useState } from "react";
import { client } from "../../lib/sanityClient";
import { ProductType } from "../../types/Product";
import { useSearchContext } from "../../context/SearchContext";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { searchQuery } = useSearchContext();

  useEffect(() => {
    const query = '*[_type == "product"]';
    client.fetch<ProductType[]>(query).then((results) => setProducts(results));
  }, []);

  const filteredProducts = products.filter((product: ProductType) => {
    return product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  });

  return (
    <Box sx={{ my: 5 }}>
      <Grid container spacing={3}>
        {filteredProducts.map((product: ProductType) => (
          <Grid key={product._id} item md={3} sm={6} xs={12}>
            <Product {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
