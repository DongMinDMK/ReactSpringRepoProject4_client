import {  Routes, Route } from "react-router-dom";
import Index from "./component/Index";
import Heading from "./component/headerfooter/Heading";
import Footer from "./component/headerfooter/Footer";
import Login from "./component/member/Login";
import Join from "./component/member/Join"
import KindList from "./component/product/KindList";
import ProductDetail from "./component/product/ProductDetail"
import "./style/index.css"

function App() {
  return (
    <div className="container">
      <Heading></Heading>
      <Routes>
        <Route path="/" element={<Index></Index>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/kindList/:kindNum" element={<KindList></KindList>}></Route>
        <Route path="/productDetail/:pseq" element={<ProductDetail></ProductDetail>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
