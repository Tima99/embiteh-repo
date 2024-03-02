import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
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
                    <MenubarTrigger>Masters</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarItem>
                            <Link to="/admin/masters/productLabelMaster">Product Label Master</Link>
                        </MenubarItem>
                        <MenubarItem>
                            New Window <MenubarShortcut>⌘N</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled>New Incognito Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Email link</MenubarItem>
                                <MenubarItem>Messages</MenubarItem>
                                <MenubarItem>Notes</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>
                            Print... <MenubarShortcut>⌘P</MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Product Management</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarItem>
                            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>
                            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Find</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Search the web</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Find...</MenubarItem>
                                <MenubarItem>Find Next</MenubarItem>
                                <MenubarItem>Find Previous</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarItem>Cut</MenubarItem>
                        <MenubarItem>Copy</MenubarItem>
                        <MenubarItem>Paste</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>View</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarCheckboxItem>
                            Always Show Bookmarks Bar
                        </MenubarCheckboxItem>
                        <MenubarCheckboxItem checked>
                            Always Show Full URLs
                        </MenubarCheckboxItem>
                        <MenubarSeparator />
                        <MenubarItem inset>
                            Reload <MenubarShortcut>⌘R</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem disabled inset>
                            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Hide Sidebar</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Profiles</MenubarTrigger>
                    <MenubarContent sideOffset={-10} alignOffset={160}>
                        <MenubarRadioGroup value="benoit">
                            <MenubarRadioItem value="andy">
                                Andy
                            </MenubarRadioItem>
                            <MenubarRadioItem value="benoit">
                                Benoit
                            </MenubarRadioItem>
                            <MenubarRadioItem value="Luis">
                                Luis
                            </MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSeparator />
                        <MenubarItem inset>Edit...</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem inset>Add Profile...</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            <div className="flex-1 ">
                <div className="flex py-[0.85rem] border-b w-full gap-4 bg-white justify-end px-6">
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
