import Signin from "./pages/Signin";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-500">
        <div className="relative artboard phone-1 bg-gray-300 rounded-lg p-4 flex flex-col justify-center items-center">
          <div className="absolute w-full top-0 left-0 h-12 bg-slate-400 rounded-t-lg text-slate-50 font-extrabold text-xl flex items-center justify-start px-2">
            Watt's Chatt
          </div>
          <Signin />
        </div>
      </div>
    </>
  );
}

export default App;
