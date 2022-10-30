import './App.css';
import {
  Routes, Route, NavLink
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import AddEditPostPage from './pages/AddEditPostPage';


function App() {
  return (
    <div className="App">
      <NavLink to='/' element={<HomePage />} end>Home</NavLink><br />
      <NavLink to='/add-edit-post'>Add edit post</NavLink>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail/:postId' element={<PostDetailPage />} />
        <Route path='/add-edit-post' element={<AddEditPostPage />} />
        <Route path='/add-edit-post/:postId' element={<AddEditPostPage />} />
      </Routes>
    </div>
  );
}

export default App;
