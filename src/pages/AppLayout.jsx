import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MainNav from "../ui/MainNav";
import AboutModal from "./About/AboutModal";
import { AnimatePresence } from "motion/react";

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isAboutOpen = location.pathname === "/about";

  function handleCloseAbout() {
    navigate("/");
  }

  return (
    <div>
      <MainNav />
      <main>
        <Outlet />
      </main>

      <AnimatePresence>
        {isAboutOpen && <AboutModal onClose={handleCloseAbout} />}
      </AnimatePresence>
    </div>
  );
}

export default AppLayout;
