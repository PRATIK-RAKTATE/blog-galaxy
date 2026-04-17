import { Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import { AuthPage } from "./pages/AuthPage";
import { BlogDetailPage } from "./pages/blog/BlogDetailPage";
import { BlogEditorPage } from "./pages/blog/BlogEditorPage";
import { BlogListPage } from "./pages/blog/BlogListPage";
import { SerpBlogAutomationPage } from "./pages/serp-blog/SerpBlogAutomationPage";
import { SerpBlogCompetitionPage } from "./pages/serp-blog/SerpBlogCompetitionPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/blogs" element={<BlogListPage />} />
      <Route path="/blogs/new" element={<BlogEditorPage mode="create" />} />
      <Route path="/blogs/:blogIdOrSlug" element={<BlogDetailPage />} />
      <Route path="/blogs/:blogIdOrSlug/edit" element={<BlogEditorPage mode="edit" />} />
      <Route path="/serp-blog" element={<SerpBlogAutomationPage />} />
      <Route path="/serp-blog/competition" element={<SerpBlogCompetitionPage />} />
    </Routes>
  );
}
