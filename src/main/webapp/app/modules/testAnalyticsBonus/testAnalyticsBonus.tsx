import './testAnalyticsBonus.scss';

import React, {
  PureComponent, useState, useEffect
} from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Grid, Paper, TextField, Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { setUserId } from 'app/modules/testAnalyticsBonus/testAnalyticsBonus.reducer'
export interface ITestAnalyticsProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
export const TestAnalytics = (props: ITestAnalyticsProp) => {


  const { account, } = props;


  const [form, setValues] = useState({
    userId: '',
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    props.setUserId(form);
    props.history.push('/productTest');
  }

  const handleNew = event => {
    event.preventDefault();
    props.setUserId(form);
    props.history.push('/productTest/product/new');
  }

  return (
    <Paper>
      <h2 className="fontMerlion">
        TestAnalytics Bonus Track
      </h2>

      {account && account.login ? (
        <Paper>
          <FormControl onSubmit={handleSubmit}>
            &nbsp;
          <h5 className="fontMerlion" >USER</h5>
            <TextField
              name="userId"
              variant="outlined"
              onChange={handleInput}
            />
            <br></br>
            <Button style={{ backgroundColor: "#266ba0", color: "#FFFFFF" }}
              type="submit" onClick={handleSubmit} variant="contained" >List products</Button>
          &nbsp;
          <Button style={{ backgroundColor: "#266ba0", color: "#FFFFFF" }}
              type="submit" onClick={handleNew} variant="contained" color="primary">Create product</Button>
          &nbsp;
          </FormControl>

        </Paper>

      ) : (<Paper>
        <Alert color="info">
          <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
          <Link to="/login" className="alert-link">
            <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
          </Link>
          <Translate contentKey="global.messages.info.authenticated.suffix">
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
            <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
          </Translate>
        </Alert>

        <Alert color="info">
          <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
          <Link to="/account/register" className="alert-link">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </Alert>
      </Paper>)}
    </Paper>
  );
};


const mapStateToProps = ({ authentication, testAnalytics }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  userId: testAnalytics.userId,
});

const mapDispatchToProps = {
  setUserId,
};


type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(TestAnalytics);

