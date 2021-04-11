import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';

const App = () => {
  const isLoggedIn = useSelector((state) => state.currentUser.loggedIn);
  const routing = useRoutes(routes(isLoggedIn));
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
