import {
  IconCategory,
  IconDashboard,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconBox,
  IconUsersGroup,
  IconFileInvoice,
  IconPackages,
  IconTruckDelivery,
  IconUser,
  IconLogout,
  IconSettings,
} from "@tabler/icons-react";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

const NavItems = [
  { icon: IconDashboard, label: "Dashboard" },
  { icon: IconCategory, label: "Categories" },
  { icon: IconBox, label: "Products" },
  { icon: IconUsersGroup, label: "Users" },
  { icon: IconFileInvoice, label: "Invoices" },
  { icon: IconPackages, label: "Orders" },
  { icon: IconTruckDelivery, label: "Suppliers" },
  { icon: IconSettings, label: "Settings" },
];

const user = { name: "Mohamed", email: "mrg19178@gmail.com" };

export default function NavBar() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <aside className="h-screen">
      <nav
        className={`bg-primary h-full flex flex-col shadow-2xl transition-[width] duration-300 ${isVisible ? "w-86" : "w-18"}`}
      >
        <div className="p-5 pb-4 flex justify-between items-center">
          <span
            className={`font-semibold text-2xl text-accent overflow-hidden transition-all duration-300 ${isVisible ? "w-40" : "w-0"}`}
          >
            OPTISTOCK
          </span>
          <button
            className="pl-1 w-8 h-8 rounded-lg text-accent bg-primary hover:bg-secondary cursor-pointer"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <IconLayoutSidebarLeftCollapse />
            ) : (
              <IconLayoutSidebarLeftExpand />
            )}
          </button>
        </div>
        <hr />
        <SidebarContext.Provider value={{ isVisible }}>
          <ul className="flex flex-1 flex-col pt-6">
            {NavItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                isVisible={isVisible}
              />
            ))}
          </ul>
        </SidebarContext.Provider>
        <hr />
        <div className="flex flex-col mt-auto border-none  bg-primary shadow-2xl">
          <div className="m-3 flex">
            <button className="flex px-3 items-center bg-accent/60 text-primary hover:bg-accent/80 rounded-lg h-12 cursor-pointer">
              <IconUser />
            </button>
            <div
              className={`flex flex-col ml-4 overflow-hidden transition-all duration-300 ${isVisible ? "block" : "hidden"}`}
            >
              <h1 className="text-accent">{user.name}</h1>
              <p className="text-accent/80">{user.email}</p>
            </div>
          </div>
          <div className="m-3 flex">
            <button className="flex h-12 items-center bg-accent/60 text-primary hover:bg-accent/80 rounded-lg px-3 cursor-pointer">
              <IconLogout className="pl-1" />
            </button>
            <div
              className={`flex flex-col ml-4 overflow-hidden transition-all ${isVisible ? "block" : "hidden"}`}
            >
              <h1 className="text-accent pt-3">Logout</h1>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

function NavItem({ icon: Icon, label, active, alert }) {
  const { isVisible } = useContext(SidebarContext);
  return (
    <>
      <li
        className={`relative mx-auto font-medium rounded-md flex w-full max-w-[20rem] items-center h-14 my-1 pl-2 transition-colors cursor-pointer  ${active ? "bg-gradient-to-tr from-primary/20 to-secondary/40 text-accent" : "hover:bg-secondary text-accent"}`}
      >
        <div className="flex items-center h-full">
          <div className="w-12 pl-2 h-full flex  items-center justify-center">
            <Icon className="text-xl" />
          </div>
        </div>
        <span
          className={`ml-3 overflow-hidden transition-all duration-300 ${isVisible ? "w-32" : "w-0 opacity-0"}`}
        >
          {label}
        </span>
        {alert && (
          <div
            className={`absolute w-2 h-2 rounded transform top-4 transition-transform bg-accent duration-300 ${isVisible ? "translate-x-0 opacity-0" : "translate-x-4 opacity-100 right-9"}`}
          ></div>
        )}
      </li>
    </>
  );
}
