import Header from "../layouts/Header";
import HeaderContextProvider from "../context/headerContextProvider";

function Home() {
  return (
    <div className="min-h-screen">
      <HeaderContextProvider>
      <Header />
      </HeaderContextProvider>
    </div>
  );
}

export default Home;
