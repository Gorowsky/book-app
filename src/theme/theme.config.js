import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  },
  overrides: {
    MuiFormGroup: {
      root: {
        flexDirection: "row"
      }
    },
    MuiTablePagination: {
      root: {
        overflow: null
      }
    }
  }
});

export default theme;