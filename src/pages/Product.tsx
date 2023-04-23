import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { client, urlFor } from "../lib/sanityClient";
import { ProductType } from "../types/Product";
import { idrFormat } from "../utils/idrFormat";
import { useCartContext } from "../context/CartContext";

export default function ProductPage() {
  const params = useLocation();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { showCart, setShowCart, qty, increaseQty, decreaseQty, addToCart } =
    useCartContext();
  const isMobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == '${params.state.current}'][0]`;
    client.fetch(query).then((results) => setProduct(results));
  }, []);

  if (!product)
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );

  const imageUrl = urlFor(product.image[0]).url();

  return (
    <Box sx={{ my: 5 }}>
      <Stack direction={isMobile ? "column" : "row"} spacing={5}>
        <section>
          <img
            src={imageUrl}
            alt={product.name}
            width={isMobile ? "100%" : 300}
          />
          <Stack direction={"row"} spacing={1}>
            {product.image
              .slice(1, product.image.length)
              .map((img: any, i: number) => (
                <img key={i} src={`${urlFor(img)}`} alt={img} width={80} />
              ))}
          </Stack>
        </section>
        <section>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Typography variant="body1">{product.details}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            {idrFormat(product.price * qty)}
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            alignItems={"center"}
            sx={{ mb: 3 }}
          >
            <Typography sx={{ fontWeight: 500 }}>Quantity</Typography>
            <Button onClick={decreaseQty} variant="outlined">
              -
            </Button>
            <Typography>{qty}</Typography>
            <Button onClick={increaseQty} variant="outlined">
              +
            </Button>
          </Stack>
          <Button
            onClick={() =>
              addToCart(
                {
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: qty,
                },
                qty
              )
            }
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Add to Cart
          </Button>
          <Button variant="contained">Buy Now</Button>
        </section>
      </Stack>
    </Box>
  );
}
