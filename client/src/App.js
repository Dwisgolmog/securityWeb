import './App.css';
import { Routes,Route,Outlet,useNavigate } from 'react-router-dom';
import Login from './component/Login';
import SingUp from './component/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<NavBar></NavBar>}>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/SingUp' element={<SingUp />}></Route>
        </Route>
        <Route path='*' element={<div><h1>Not Found</h1>경로를 잘못 찾은듯 싶네요 URL을 확인해보아요</div>}></Route>
      </Routes>
    </>
  );
}

export default App;

function NavBar(){
  let navigate = useNavigate();
  return (
    <>
      <div class="flex flex-row">
        <h1 class="basis-11/12">NavBar</h1>
        <button class="basis-1/12" onClick={()=>{navigate("/login")}}>로그인하기</button>
      </div>

      <Outlet></Outlet>
    </>
  );
}