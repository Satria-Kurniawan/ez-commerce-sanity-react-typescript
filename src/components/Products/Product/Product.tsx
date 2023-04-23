import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { urlFor } from "../../../lib/sanityClient";
import { idrFormat } from "../../../utils/idrFormat";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../types/Product";

export default function Product(props: ProductType) {
  const { name, slug, details, price, image } = props;
  const navigate = useNavigate();

  const imageUrl = urlFor(image[0]).url();

  return (
    <Card onClick={() => navigate("/product", { state: slug })}>
      <CardMedia sx={{ height: 180 }} image={imageUrl} title={name} />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography gutterBottom variant="h6" sx={{ fontWeight: 700 }}>
              {idrFormat(price)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {name}
            </Typography>
          </div>
          <div>
            <IconButton sx={{ marginLeft: "auto" }}>
              <AddShoppingCart />
            </IconButton>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
}
