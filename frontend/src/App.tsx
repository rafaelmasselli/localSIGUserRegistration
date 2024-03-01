import { Router } from "./routes/index.routes";
import { Navbar } from "./components/shared/navbar/indext";
import { Provider } from "./provider";

function App() {
  return (
    <Provider>
      <Navbar />
      <Router />
    </Provider>
  );
}

export default App;
