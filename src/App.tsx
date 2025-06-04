import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { routes } from './routes/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
            padding: '12px 24px',
          },
        }}
      />
    </Provider>
  );
};

export default App; 