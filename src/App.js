import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './Layout/DefaultLayout';
import { Fragment } from 'react';

import io from 'socket.io-client';
import { createContext } from 'react';
const server = 'https://ptit-social-app.onrender.com';

const socket = io.connect(server);

export const SocketContext = createContext();

function App() {
   return (
      <BrowserRouter>
         <div className="App">
            <Routes>
               {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;

                  if (route.Layout) {
                     Layout = route.Layout;
                  } else if (route.Layout === null) {
                     Layout = Fragment;
                  }

                  return (
                     <Route
                        path={route.path}
                        element={
                           <SocketContext.Provider value={socket}>
                              <Layout>
                                 <Page />
                              </Layout>
                           </SocketContext.Provider>
                        }
                     />
                  );
               })}
            </Routes>
         </div>
      </BrowserRouter>
   );
}

export default App;
