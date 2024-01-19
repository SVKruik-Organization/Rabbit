import NavigationBar from './components/edge/NavigationBar';
import Footer from './components/edge/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import NotFound from './components/NotFound';

function App() {
    return (
        <div className="app">
            <NavigationBar></NavigationBar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/contact" element={<Contact></Contact>}></Route>
                    <Route path="*" element={<NotFound></NotFound>}></Route>
                </Routes>
            </BrowserRouter>
            <Footer></Footer>
        </div>
    );
}

export default App;
