import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
