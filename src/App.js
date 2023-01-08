import "./App.scss";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";

import UserState from "./context/user/user-state";
import OptionState from "./context/options/option-state";

function App() {
  return (
    <div className="App container-fluid">
      <UserState>
        <OptionState>
          <Header />
          <Container />
        </OptionState>
      </UserState>
    </div>
  );
}

export default App;
