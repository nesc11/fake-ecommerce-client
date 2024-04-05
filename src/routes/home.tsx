import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "@/components";

export default function Home() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      <div className="align-element py-20">
        {isLoading ? <Loading /> : <Outlet />}
      </div>
    </>
  );
}
