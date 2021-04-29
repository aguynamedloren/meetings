import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {createStore} from 'redux';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import { loadState, saveState } from './sessionStorage';
import axios from 'axios';

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:3001";
} else if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = "http://thawing-harbor-12947.herokuapp.com";
}

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
