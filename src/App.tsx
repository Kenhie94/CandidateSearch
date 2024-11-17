import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { SavedCandidatesProvider } from "./interfaces/Candidate.interface";

function App() {
  return (
    <SavedCandidatesProvider>
      <>
        <Nav />
        <main>
          <Outlet />
        </main>
      </>
    </SavedCandidatesProvider>
  );
}

export default App;
