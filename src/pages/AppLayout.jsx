import { Outlet } from "react-router-dom";
import MainNav from "../ui/MainNav";

function AppLayout() {
  return (
    <div>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
