import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './Layout/DefaultLayout';
import { Fragment } from 'react';

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
                           <Layout>
                              <Page />
                           </Layout>
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
