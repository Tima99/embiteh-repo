import { Routes, Route } from "react-router-dom";
import Navbar from "@/layouts/RootLayout";
import Home from "@/pages/web/Home";
import ProductDetail from "@/pages/web/ProductDetail";
import AccountPage from "@/pages/web/Login";

const WebRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/product/detail/:id" element={<ProductDetail />}></Route>
      </Route>

      <Route path="/account/auth" element={<AccountPage />}></Route>
    </Routes>
  );
};

export default WebRoutes;
