import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Mountains from "./pages/Mountains";
import MountainDetail from "./pages/MountainDetail";
import AIAdvisor from "./pages/AIAdvisor";
import Weather from "./pages/Weather";
import Education from "./pages/Education";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "mountains", Component: Mountains },
      { path: "mountains/:id", Component: MountainDetail },
      { path: "weather", Component: Weather },
      { path: "ai-advisor", Component: AIAdvisor },
      { path: "education", Component: Education },
    ],
  },
]);
