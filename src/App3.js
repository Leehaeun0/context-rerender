import { createContext, useContext, useState } from "react";

const CountStateContext = createContext(null);
const CountDispatchContext = createContext(null);

function AComponent() {
  console.log("render A");

  return <div className="A">A</div>;
}

function BComponent() {
  const setCount = useContext(CountDispatchContext);
  console.log(`render B`);

  return (
    <div className="B">
      B <button onClick={() => setCount((prev) => prev + 1)}>update</button>
    </div>
  );
}

function CComponent() {
  const count = useContext(CountStateContext);
  console.log("render C");

  return <div className="C">C count: {count}</div>;
}

function App3() {
  console.log("render App");

  return (
    <CountProvider>
      <div className="Provider">
        App3 Provider (App2에서 State Provider와 Dispath Provider를 분리한 방식)
        <AComponent />
        <BComponent />
        <CComponent />
      </div>
    </CountProvider>
  );
}

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  console.log("render CountProvider");

  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={setCount}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}

export default App3;
