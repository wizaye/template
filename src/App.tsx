import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import ComparePage from "@/pages/compare";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import SortingPage from '@/pages/sorting';
import SearchingPage from '@/pages/searching';

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<SortingPage />} path="/sorting" />
      <Route element={<SearchingPage />} path="/searching" />
      <Route element={<ComparePage />} path="/compare" />
    </Routes>
  );
}

export default App;
