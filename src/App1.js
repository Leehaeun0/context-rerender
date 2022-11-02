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

function App1() {
  const [count, setCount] = useState(0);
  const contextValue = useMemo(() => ({ count, setCount }), [count, setCount]);
  console.log("render App1");

  return (
    <CountContext.Provider value={contextValue}>
      <div className="Provider">
        App1 Provider (Context를 App 최상단에서 바로 사용하는 방식)
        <AComponent />
        <BComponent />
        <CComponent />
      </div>
    </CountContext.Provider>
  );
}

export default App1;
