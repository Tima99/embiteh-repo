import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/shadcn/components/ui/menubar";
import Logo from "@/assets/Logo.jpeg";
import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex">
            <Menubar className="flex flex-col h-screen w-[15%] min-w-64 items-start p-0 poppins-font">
                <div className="flex px-2 py-3 border-b w-full gap-4 bg-white">
                    <img src={Logo} className="w-[42px] aspect-square" alt="" />
                    <h2 className="text-md leading-5 font-semibold translate-y-1 text-gray-900">
                        Embiteh <br /> Innovations
                    </h2>
                </div>
                <MenubarMenu>
                    <MenubarTrigger>Embiteh Masters</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarItem>
                            <Link to="/admin/masters/productLabel">
                                Manage Label Master
                            </Link>
                        </MenubarItem>
                        {/* <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Email link</MenubarItem>
                                <MenubarItem>Messages</MenubarItem>
                                <MenubarItem>Notes</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub> */}
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Product Management</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarItem>
                            <Link to="/admin/productManagement/manageProduct">
                                Manage Product
                            </Link>
                            <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <div className="flex-1 ">
                <div className="flex py-[0.85rem] 2xl:py-[0.78rem] border-b w-full gap-4 bg-white justify-end px-6">
                    <Menubar className="border-none active:bg-none">
                        <MenubarMenu>
                            <MenubarTrigger className="shadow-none bg-none">
                                <img
                                    src={Logo}
                                    className="w-[42px] aspect-square rounded-full"
                                    alt=""
                                />
                            </MenubarTrigger>
                            <MenubarContent alignOffset={-120} sideOffset={4}>
                                <MenubarItem>
                                    Profile
                                    <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    Logout
                                    <MenubarShortcut>⌘N</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>

                <div className="p-6 overflow-x-hidden h-hero">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
export default AdminLayout;
