import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import { Navigation } from './routes/Navigation.component';
import Login from './pages/Login.component';
import Shop from './pages/Shop.component';
import Product from './pages/Product.component';
import Redeem from './pages/Redeem.component';
import Activity from './pages/Activity.component';
import { ProductList, CreateProduct, EditProduct } from './pages/dashboard/index';
import DashboardLayout from './components/dashboard';
import Categories from './pages/Categories.component';
import Scan from './pages/Scan.component';

import { setCurrentUser } from './app/user/user.action';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try{
        const response = await axios.get('http://localhost:5000/auth/login/success', {withCredentials: true})
        const user = response.data.user
        
        if (user) dispatch(setCurrentUser(user));
      } catch(err) {
        return;
      }
    }
    getUser()
    // eslint-disable-next-line
  }, []);



  return (
    <>
      <Routes>
        <Route path='/' element={<Navigation />} key={window.location.pathname} >
          <Route index element={<Navigate to='/auth' />} />
          <Route path='shop' element={<Shop />} />
          <Route path='activity' element={<Activity />} />
        </Route>
        <Route path='/shop/:category' element={<Categories />} />
        <Route path='/product'>
          <Route path=':id' element={<Product />} />
        </Route>
        <Route path='/auth' element={<Login />} />
        <Route path='/reward/:id' element={<Redeem />} />
        <Route path='/scan/:id' element={<Scan />} />
        <Route path='dashboard' element={<DashboardLayout />}>
          <Route path='product'>
            <Route path='list' element={<ProductList />} />
            <Route path=':id' element={<EditProduct />} />
            <Route path='new' element={<CreateProduct />} />
          </Route>
          <Route path='sales'>
            <Route path='list' element={<ProductList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}


export default App;
