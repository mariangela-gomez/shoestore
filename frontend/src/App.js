import "./App.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setDataProduct } from "./redux/productSlide";
import { useDispatch } from "react-redux";
import localProducts from "./data/products";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // El catálogo local se muestra al instante.
    dispatch(setDataProduct(localProducts));

    // Si el backend responde con productos, se suman al catálogo.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_DOMIN}/product`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const remote = await res.json();
        if (Array.isArray(remote) && remote.length > 0) {
          dispatch(setDataProduct([...localProducts, ...remote]));
        }
      } catch (err) {
        console.log("Backend no disponible, usando catálogo local");
      } finally {
        clearTimeout(timer);
      }
    })();
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-ink text-zinc-100">
      <Toaster
        toastOptions={{
          style: { background: "#141416", color: "#fff", border: "1px solid #26262a" },
        }}
      />
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
