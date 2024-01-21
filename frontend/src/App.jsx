import NavigationBar from './components/edge/NavigationBar';
import Footer from './components/edge/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Contact from './components/Contact';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Shop from './components/Shop';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <NavigationBar></NavigationBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/cancel" element={<Shop />} />
                    <Route path="/success" element={<Shop />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
