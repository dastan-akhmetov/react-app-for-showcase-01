import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import "./App.css";
import { Header, PostPage, PostsPage } from "./features";

const { Content: AntdContent } = Layout;

export const App = observer(() => {
  return (
    <Router>
      <Header />

      <AntdContent style={{ padding: "54px 50px" }}>
        <div className="site-layout-content">
          <Switch>
            <Route path="/posts/:postId">
              <PostPage />
            </Route>
            <Route path="/posts">
              <PostsPage />
            </Route>
            <Route path="/">
              <PostsPage />
            </Route>
          </Switch>
        </div>
      </AntdContent>
    </Router>
  );
});
