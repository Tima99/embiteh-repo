import { motion } from "framer-motion";
import Logo from "@/assets/Logo.jpeg";
import { Button } from "@/shadcn/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/shadcn/components/ui/drawer";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/shadcn/components/ui/toaster";
import { BsCart3 } from "react-icons/bs";
import { useEffect } from "react";

const Navbar = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <>
            <Toaster />

            <nav className="z-50 flex justify-between items-center p-4 sticky top-0 bg-white bg-opacity-25 backdrop-blur-sm shadow-[0px_1px_30px_0px_rgba(30,30,30,0.08)]">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Link to={'/'} className="block w-12 h-auto aspect-w-8 aspect-h-8">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </motion.div>
                <div className="hidden md:flex flex-grow justify-center">
                    <motion.ul
                        className="flex list-none m-0 p-0"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.li className="m-0 px-2 cursor-pointer hover:scale-110 font-semibold text-lg ">
                            <Link to="/">Home</Link>
                        </motion.li>
                        <motion.li className="m-0 px-2 cursor-pointer hover:scale-110 font-semibold text-lg ">
                            <Link to="/">Products</Link>
                        </motion.li>
                        <motion.li className="m-0 px-2 cursor-pointer hover:scale-110 font-semibold text-lg ">
                            <Link to="/">Contact</Link>
                        </motion.li>
                    </motion.ul>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="hidden md:flex items-center gap-6"
                >
                    <div className="relative">
                        <BsCart3 size={25} className={"text-gray-900 z-10"} />
                    </div>
                    <Button>Login</Button>
                </motion.div>

                <Drawer>
                    <DrawerTrigger className="md:hidden flex items-center gap-4" as="button">
                        <div className="relative">
                            <BsCart3
                                size={26}
                                className={"text-gray-900 z-10"}
                            />
                        </div>
                        <Button>☰</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                            <DrawerClose />
                        </DrawerHeader>
                        <DrawerDescription>
                            <ul className="flex flex-col items-center justify-center h-full">
                                <li className="my-2 cursor-pointer">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="my-2 cursor-pointer">
                                    <Link to="/">Products</Link>
                                </li>
                                <li className="my-2 cursor-pointer">
                                    <Link to="/">Contact</Link>
                                </li>
                            </ul>
                        </DrawerDescription>
                        <DrawerFooter>
                            <DrawerClose>
                                <Button variant="destructive">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </nav>

            <Outlet></Outlet>
        </>
    );
};

export default Navbar;
