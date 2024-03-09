import { Routes, Route } from "react-router-dom";
import Login from "@/pages/admin/Login";
import Home from "@/pages/admin/Home";
import ProductLabelMaster from "@/pages/admin/masters/ProductLabelMaster";
import AddProductLabelMaster from "@/pages/admin/masters/ProductLabelMaster/Add";
import ProductList from "@/pages/admin/Product";
import AdminLayout from "@/layouts/AdminLayout";
import AddProduct from "@/pages/admin/Product/Add";
import EditImagesGallery from "@/pages/admin/Product/EditImagesGallery";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/admin/login" element={<Login />}></Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Home />} />
                <Route path="masters/productLabel" element={<ProductLabelMaster />} />
                <Route path="masters/productLabel/add" element={<AddProductLabelMaster />} />
                <Route path="productManagement/manageProduct" element={<ProductList />} />
                <Route path="productManagement/manageProduct/add" element={<AddProduct />} />
                <Route path="productManagement/manageProduct/edit" element={<AddProduct />} />
                <Route path="productManagement/manageProduct/:productId/editImageGallery" element={<EditImagesGallery />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
