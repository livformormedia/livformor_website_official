import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ExportHTML from './pages/ExportHTML';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Blog": Blog,
    "BlogPost": BlogPost,
    "ExportHTML": ExportHTML,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};