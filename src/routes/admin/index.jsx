import { Routes, Route } from "react-router-dom";
import Login from "@/pages/admin/Login";
import Home from "@/pages/admin/Home";
import ProductLabelMaster from "@/pages/admin/masters/ProductLabelMaster";
import AddProductLabelMaster from "@/pages/admin/masters/ProductLabelMaster/Add";
import AdminLayout from "@/layouts/AdminLayout";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<Login />}></Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Home />} />
                <Route path="masters/productLabel" element={<ProductLabelMaster />} />
                <Route path="masters/productLabel/add" element={<AddProductLabelMaster />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
