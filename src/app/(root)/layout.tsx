import { SidebarDemo } from "../../../components/shared/sideNavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="flex-shrink-0">
        <SidebarDemo />
      </div>
      <div className="flex-grow overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
