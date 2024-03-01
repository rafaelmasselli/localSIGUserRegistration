import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes/index.routes";
import { Navbar } from "./components/shared/navbar/indext";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
