import { PiInstagramLogoDuotone } from "react-icons/pi";
import { BiLogoFacebookCircle } from "react-icons/bi";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-4 xl:pl-16">
            <div className="container mx-auto px-4 sm:grid sm:grid-cols-3 grid-cols-1 gap-8 space-y-4 sm:space-y-0 ">
                {/* Links Column */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Links</h2>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">About</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Contact</h2>
                    <p>Email: example@example.com</p>
                    <p>Phone: +1234567890</p>

                    <div className="py-2 flex gap-3 ">
                        <PiInstagramLogoDuotone
                            size={32}
                            className="text-pink-500 cursor-pointer"
                        />
                        <BiLogoFacebookCircle 
                            size={32}
                            className="text-blue-700 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Address Column */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Address</h2>
                    <p>123 Street Name</p>
                    <p>City, Country</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
