import { Routes, Route } from "react-router-dom";
import Navbar from "@/layouts/RootLayout";
import Home from "@/pages/web/Home";
import ProductDetail from "@/pages/web/ProductDetail";

const WebRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
                <Route index element={<Home />} />
                <Route
                    path="/product/detail"
                    element={<ProductDetail />}
                ></Route>
            </Route>
        </Routes>
    );
};

export default WebRoutes;
