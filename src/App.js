import MyForm from "./components/MyForm";
// import "App.css";
import { DBConfig } from "./components/DBconfig";
import { initDB } from "react-indexed-db";

initDB(DBConfig);

export default function App() {
  return (
    <div>
      <MyForm />
    </div>
  );
};
