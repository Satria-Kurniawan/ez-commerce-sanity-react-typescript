import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Theme,
  Container,
  Badge,
  Box,
  List,
  ListItem,
  Divider,
  Button,
  Drawer,
  Stack,
  TextField,
} from "@mui/material";
import {
  Search as SearchIcon,
  Shop,
  LocalMallOutlined,
  RemoveCircle,
  KeyboardArrowLeft,
} from "@mui/icons-material";
import { idrFormat } from "../utils/idrFormat";
import { useCartContext } from "../context/CartContext";
import { useSearchContext } from "../context/SearchContext";
import { urlFor } from "../lib/sanityClient";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const {
    showCart,
    setShowCart,
    totalQuantities,
    cartItems,
    updateCartItemQty,
    removeCartItem,
  } = useCartContext();
  const navigate = useNavigate();
  const { onChange } = useSearchContext();

  const isMobile: boolean = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  function TemporaryDrawer() {
    const list = () => (
      <Box minWidth={isMobile ? 200 : 400}>
        <List>
          <ListItem sx={{ mb: 3 }}>
            <IconButton onClick={() => setShowCart(false)}>
              <KeyboardArrowLeft />
            </IconButton>
            <Typography variant={"h6"} sx={{ fontWeight: 600 }}>
              Shopping Cart
            </Typography>
          </ListItem>

          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <ListItem
                  key={item._id}
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    gap: "24px",
                  }}
                >
                  <img
                    src={`${urlFor(item.image[0])}`}
                    loading="lazy"
                    alt=""
                    width={isMobile ? 40 : 100}
                    style={{ borderRadius: "4px" }}
                  />
                  <Box>
                    <Typography variant={"body1"} sx={{ mb: 1 }}>
                      {item.name}
                    </Typography>
                    <Stack
                      direction={isMobile ? "column" : "row"}
                      alignItems={"center"}
                      spacing={isMobile ? 0 : 2}
                    >
                      <Button
                        onClick={() => {
                          if (item.quantity > 1) {
                            return updateCartItemQty(item._id, "decrement");
                          }
                          return removeCartItem(item._id, item.quantity);
                        }}
                        variant="outlined"
                      >
                        -
                      </Button>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <Button
                        onClick={() => updateCartItemQty(item._id, "increment")}
                        variant="outlined"
                      >
                        +
                      </Button>
                    </Stack>
                  </Box>
                  <div>
                    <Typography
                      variant="body1"
                      sx={{ marginLeft: "auto", fontWeight: 600 }}
                    >
                      {idrFormat(item.quantity * item.price)}
                    </Typography>
                    <IconButton
                      onClick={() => removeCartItem(item._id, item.quantity)}
                      sx={{ display: "flex", ml: "auto" }}
                    >
                      <RemoveCircle color="error" />
                    </IconButton>
                  </div>
                </ListItem>
              ))}
              <Divider />
            </>
          ) : (
            <Box
              height={"80vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              mb={3}
            >
              <div>
                <LocalMallOutlined fontSize="large" />
                <Typography variant="body1" sx={{ mb: 2, mx: 5 }}>
                  Keranjang anda masih kosong.
                </Typography>
                <Button
                  onClick={() => {
                    navigate("/");
                    setShowCart(false);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Continue Shopping
                </Button>
              </div>
            </Box>
          )}
        </List>
      </Box>
    );

    return (
      <div>
        <IconButton onClick={() => setShowCart(true)}>
          <Badge color="primary" badgeContent={totalQuantities}>
            <LocalMallOutlined />
          </Badge>
        </IconButton>
        <Drawer
          anchor={"right"}
          open={showCart}
          onClose={() => setShowCart(false)}
        >
          {list()}
        </Drawer>
      </div>
    );
  }

  return (
    <AppBar position="sticky" color="inherit">
      <Container>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Shop />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, display: isMobile ? "none" : "block" }}
          >
            EZ-Commerce
          </Typography>
          <TextField
            onChange={onChange}
            label="Search"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            sx={{ mr: 3 }}
          />
          <TemporaryDrawer />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
