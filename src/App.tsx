import theme from "./styles/theme.js";
import { Container, ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home.js";
import ProductPage from "./pages/Product.js";
import { CartProvider } from "./context/CartContext.js";
import { SearchProvider } from "./context/SearchContext.js";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchProvider>
          <CartProvider>
            <CssBaseline />
            <BrowserRouter>
              <Nav />
              <Container>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product" element={<ProductPage />} />
                </Routes>
              </Container>
            </BrowserRouter>
          </CartProvider>
        </SearchProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
