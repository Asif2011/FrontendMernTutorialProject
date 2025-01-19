import NavBar from './components/navBar'
import Footer from './components/Footer'
// import Home from './pages/Home'
// import About from './pages/AboutUs'
import Protected from './components/protected';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Error from './pages/Error';
import Login from './pages/login'
import React from 'react';
import { useSelector } from 'react-redux';
import SignupPage from './pages/Signup'
import Home from './pages/Home'
import AllBlogs from './pages/Blogs';
import CreateBlog from './pages/CreateBlog';
import useAutoLogin from './hooks/useAutoLogin';
import Loader from './components/Loader';
import BlogDetailsPage from './pages/BlogDetails';

function App() {
  const isAuth = useSelector((state) => state.user.auth)
  const laoding = useAutoLogin()
  let rootTree
  if (laoding) {
    rootTree = <Loader text='page loading' />
  }
  else{
    rootTree = (
      <div className={styles.container}>
        <Router>
          <NavBar />
          <div className={styles.layout}>
            <Routes>
              <Route path='/' element={<div className={`${styles.logo}`}><Home /></div>} />
              <Route path='/developer' element={<div className={styles.main}><p>About to update till 22 jan 2025</p></div>} />
              <Route path='/blogs' element={<Protected isauth={isAuth} className={styles.main}><AllBlogs /></Protected>} />
              <Route path='/blog/:id' exact element={<Protected isauth={isAuth} className={styles.main}><BlogDetailsPage /></Protected>} />
              <Route path='/create' element={<Protected isauth={isAuth}><div className={styles.main}><CreateBlog /></div></Protected>} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<div className={styles.main}><SignupPage /></div>} />
              <Route path='/signout' element={<Protected isauth={isAuth}><div className={styles.main}><h1>sign out</h1></div></Protected>} />
              <Route path='*' element={<Error />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }

  return rootTree;

}

export default App;
