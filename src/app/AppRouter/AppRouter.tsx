import { Route, Switch, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";

export const AppRouter = () => {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/:language" nest>
          <Route path="/"/>
          <Route path="/investigator/:id" component={InvestigatorPage}/>
        </Route>
        <Route path="/" component={HomePage}/>
      </Switch>
    </Router>
  );
}