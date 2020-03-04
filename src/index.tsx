import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/scss/app.scss';

import HomePage from './components/HomePage/index';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiTypography: {
      variantMapping: {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        subtitle1: 'h2',
        subtitle2: 'h2',
        body1: 'span',
        body2: 'span'
      }
    }
  }
});

export default class App extends React.Component {
  render() {
    return(
      <ThemeProvider {... { theme } }>
        <HomePage/>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));