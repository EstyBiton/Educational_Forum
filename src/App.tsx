import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router'
import {store} from '../src/data/redux/store'
import { Provider } from 'react-redux';

function App() {
  return (<>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
</>
  );
}

export default App;
