import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={true}
        gutter={-50}
        toastOptions={{ duration: 4000 }}
      />
    </div>
  );
}

export default App;
