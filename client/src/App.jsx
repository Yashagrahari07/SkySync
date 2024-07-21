import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import Profile from "./pages/Profile"
import About from "./pages/About"
import Weather from "./pages/Weather"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/weather" element={<Weather/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
 