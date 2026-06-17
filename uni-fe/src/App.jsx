import { useEffect, useMemo, useState } from "react";
import {
  defaultContent,
  loadContent,
  saveContent,
} from "./data/siteContent.js";
import Footer from "./views/home/footer.jsx";
import Header from "./views/home/header.jsx";
import SectionOne from "./views/home/section-1.jsx";
import SectionTwo from "./views/home/section-2.jsx";
import SectionThree from "./views/home/section-3.jsx";
import Dashboard from "./views/page-other/dashboard/dashboard.jsx";
import LearningPath from "./views/page-other/learningPath.jsx";
import LoginAdmin from "./views/page-other/loginAdmin.jsx";

function usePathRoute() {
  const [route, setRoute] = useState(window.location.pathname || "/");

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname || "/");
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  function navigate(nextRoute) {
    window.history.pushState({}, "", nextRoute);
    setRoute(nextRoute);
  }

  return [route, navigate];
}

export default function App() {
  const [route, setRoute] = usePathRoute();
  const [lang, setLang] = useState("vi");
  const [activeLang, setActiveLang] = useState("vi");
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("aboutUni.isAdmin") === "true",
  );
  const [content, setContent] = useState(loadContent);

  useEffect(() => {
    saveContent(content);
  }, [content]);

  const currentContent = useMemo(
    () => content[lang] ?? content.vi,
    [content, lang],
  );

  function handleLogin() {
    sessionStorage.setItem("aboutUni.isAdmin", "true");
    setIsAdmin(true);
    setRoute("/admin/dashboard");
  }

  if (route === "/admin" && !isAdmin) {
    return <LoginAdmin goHome={() => setRoute("/")} onLogin={handleLogin} />;
  }

  if (route === "/admin" || route === "/admin/dashboard") {
    if (!isAdmin) {
      return <LoginAdmin goHome={() => setRoute("/")} onLogin={handleLogin} />;
    }

    return (
      <Dashboard
        activeLang={activeLang}
        content={content}
        goHome={() => setRoute("/")}
        resetContent={() => setContent(defaultContent)}
        setActiveLang={setActiveLang}
        updateContent={setContent}
      />
    );
  }

  if (route === "/lo-trinh-hoc") {
    return (
      <div
        id="top"
        className="min-h-screen overflow-hidden bg-slate-50 text-slate-900"
      >
        <Header
          content={currentContent}
          lang={lang}
          navigate={setRoute}
          route={route}
          setLang={setLang}
        />
        <LearningPath content={currentContent} goHome={() => setRoute("/")} />
        <Footer content={currentContent} />
      </div>
    );
  }

  return (
    <div
      id="top"
      className="min-h-screen overflow-hidden bg-slate-50 text-slate-900"
    >
      <Header
        content={currentContent}
        lang={lang}
        navigate={setRoute}
        route={route}
        setLang={setLang}
      />
      <main>
        <SectionOne content={currentContent} />
        <SectionTwo content={currentContent} />
        <SectionThree content={currentContent} />
      </main>
      <Footer content={currentContent} />
    </div>
  );
}
