import { HomePage } from "@/pages/HomePage/HomePage";
import { InvestigatorPage } from "@/pages/InvestigatorPage/InvestigatorPage";
import { HashRouter, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/">
          <Route path=":language">
            <Route index Component={HomePage}/>
            <Route path="investigator/:id" Component={InvestigatorPage}/>
          </Route>
          <Route path="investigator/:id" Component={InvestigatorPage}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}