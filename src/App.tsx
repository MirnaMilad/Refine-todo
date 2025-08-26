import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import TodoList from "./pages/todos/list";
import TodoCreate from "./pages/todos/create";
import TodoEdit from "./pages/todos/edit";
import UsersList from "./pages/users/list";
import UsersCreate from "./pages/users/create";
import UsersEdit from "./pages/users/edit";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider()}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "Q6nfhB-Kodh2D-Wm6mQP",
                }}
                resources={[
                  {
                    name: "todos",
                    list: "/todos",
                    create: "/todos/create",
                    edit: "/todos/edit/:id",
                    show: "/todos/show/:id",
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                  },
                ]}
              >
                <Routes>
                  <Route
                    index
                    element={<NavigateToResource resource="todos" />}
                  />
                  <Route path="/todos" element={<TodoList />} />
                  <Route path="/todos/create" element={<TodoCreate />} />
                  <Route path="/todos/edit/:id" element={<TodoEdit />} />
                  <Route path="*" element={<div>Not found</div>} />
                  <Route path="/users" element={<UsersList />} />
                  <Route path="/users/create" element={<UsersCreate />} />
                  <Route path="/users/edit/:id" element={<UsersEdit />} />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
