import { useMemo } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const Typography = {};

const H1 = ({ children }) => {
  return (
    <h1 className="whitespace-nowrap text-2xl 2xl:text-3xl font-semibold text-[#151617]">
      {children}
    </h1>
  );
};
const H2 = ({ children }) => {
  return (
    <h1 className="whitespace-nowrap text-2xl font-semibold text-[#151617]">
      {children}
    </h1>
  );
};

function extractAndFormatPath(inputPath, position = -1) {
  const pathParts = inputPath.split("/");
  const lastPart = pathParts.at(position);

  // Convert the last part to Title Case
  const formattedLastPart = lastPart.replace(/([A-Z])/g, " $1").trim();

  return formattedLastPart.charAt(0).toUpperCase() + formattedLastPart.slice(1);
}

const Heading = ({ title, children, isBack, subMenuPrefix, subMenuSuffix, subTitle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [subMenuName, menuName] = useMemo(
    () => [extractAndFormatPath(pathname, -2), extractAndFormatPath(pathname)],
    [pathname],
  );

  return (
    <div className="poppins-font flex flex-wrap gap-y-5 items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        {isBack && (
          <IoArrowBackCircle
            size={34}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        )}
        <span className="flex items-center gap-3">
          <H1>{subMenuName.includes("Masters") ? "Manage ": ""}{title || menuName}</H1>
          {subMenuName && (
            <span className="mt-1 flex gap-2">
              <span className="font-bold">-</span>
              <p className="text-base font-semibold text-yellow1">
                {subTitle ? subTitle : (subMenuPrefix || "") + ' ' + subMenuName + ' ' + (subMenuSuffix || "")}
              </p>
            </span>
          )}
        </span>
      </div>
      {children}
    </div>
  );
};

Typography.H1 = H1;
Typography.H2 = H2;
Typography.Heading = Heading;

export default Typography;
