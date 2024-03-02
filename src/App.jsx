import { useLocation } from "react-router-dom";
import "./App.css";
import AdminRoutes from "./routes/admin";
import WebRoutes from "./routes/web";
import { Toaster } from "react-hot-toast";

function App() {
    const { pathname } = useLocation();
    const IS_ADMIN = pathname.includes("admin");

    return (
        <>
            <Toaster
                toastOptions={{
                    duration: 3000,
                }}
            />
            {IS_ADMIN ? <AdminRoutes /> : <WebRoutes />}
        </>
    );
}

export default App;
