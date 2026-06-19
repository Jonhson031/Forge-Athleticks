import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

export default function RootLayout() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
