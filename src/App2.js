import { createContext, useContext, useMemo, useState } from "react";

const CountContext = createContext(null);

function AComponent() {
  console.log("render A");

  return <div className="A">A</div>;
}

function BComponent() {
  const { setCount } = useContext(CountContext);
  console.log(`render B`);

  return (
    <div className="B">
      B <button onClick={() => setCount((prev) => prev + 1)}>update</button>
    </div>
  );
}

function CComponent() {
  const { count } = useContext(CountContext);
  console.log("render C");

  return <div className="C">C count: {count}</div>;
}

function App2() {
  console.log("render App2");

  return (
    <CountProvider>
      <div className="Provider">
        App2 Provider (ContextProvider를 컴포넌트화 하여 children을 전달하는
        방식)
        <AComponent />
        <BComponent />
        <CComponent />
      </div>
    </CountProvider>
  );
}

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  const contextValue = useMemo(() => ({ count, setCount }), [count, setCount]);
  console.log("render CountProvider");

  return (
    <CountContext.Provider value={contextValue}>
      {children}
    </CountContext.Provider>
  );
}

export default App2;
