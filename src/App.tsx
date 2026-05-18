import { LoadingProvider } from "./../src/context/LoadingProvider";
import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <LoadingProvider>
      <Navbar />
      <MainContainer />
    </LoadingProvider>
  );
}

export default App;