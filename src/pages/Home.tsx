import Header from "../layouts/Header";
import HeaderContextProvider from "../context/headerContextProvider";
import AdvancedSearch from "../features/listing/advancedSearch/components/AdvancedSearch";
import Container from "../components/ui/Container";

function Home() {
  return (
    <div className="min-h-screen">
      <HeaderContextProvider>
      <Header />
      <Container>
        <AdvancedSearch />
      </Container>
      </HeaderContextProvider>
    </div>
  );
}

export default Home;
