import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logout, sessionLogin, sessionResume, setToken } from 'actions/auth';
import { getCurrentTech } from 'actions/tech';
import {
  selectAuthToken,
  selectAuthLoading,
  selectIsAuth,
  selectAuthRedirect,
} from 'Selectors/auth';
import { selectTechEmail } from 'Selectors/tech';
import useInterval from 'hooks/useInterval';
import Spinner from 'components/Common/Spinner';

let cookie;

export const PrivateRoute = ({
  token,
  isAuth,
  authLoading,
  redirect,
  sessionLogin,
  sessionResume,
  login,
  logout,
  sessionLoginRequester,
  techEmail,
  getCurrentTech,
  setToken,
  location: { pathname },
  computedMatch: { params, url },
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  useEffect(() => {
    if (params.requesterEmail) {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      if (!isAuth && authLoading) {
        if (params.token) {
          console.log('start requester session from param token');
          sessionLogin(
            params.studioId,
            params.requesterEmail,
            params.token,
            params.id,
            false
          );
        } else if (cookie && cookie.email === params.requesterEmail) {
          console.log('start requester session from cookie token');
          sessionLogin(
            params.studioId,
            params.requesterEmail,
            cookie.token,
            params.id,
            false
          );
        } else {
          console.log('logout');
          logout();
        }
      }
    } else {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      if (!isAuth && authLoading) {
        if (params.token) {
          console.log('start tech session from param token');
          sessionLogin(
            params.studioId,
            params.techEmail,
            params.token,
            pathname,
            true
          );
        } else if (cookie && cookie.email === params.techEmail) {
          console.log('start tech session from cooke token');
          sessionLogin(
            params.studioId,
            params.techEmail,
            cookie.token,
            pathname,
            true
          );
        } else {
          console.log('logout');
          logout();
        }
      }
    }
  }, [
    isAuth,
    params,
    sessionLoginRequester,
    sessionLogin,
    pathname,
    logout,
    authLoading,
  ]);

  // set tech token in state and remove token from url
  useEffect(() => {
    if (params.token && isAuth) {
      console.log('go');
      setToken(params.token);
      const location = url.split('/');
      location.pop();
      history.push(location.join('/'));
    }
  }, [isAuth, setToken, params.token, url, history]);

  // refresh token every 30 min
  useInterval(() => {
    console.log('useInterval');
    cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
    sessionResume(params.studioId, params.techEmail, cookie.token);
  }, 1800000);

  // redirect to login page if tech requires login when not in development
  if (!isAuth && redirect) {
    return (
      <Route
        render={() => {
          window.location.href = `https://system.onuma.com/user/login?_next=${redirect}`;
          return null;
        }}
      />
    );
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth && techEmail ? (
          <div>
            <Component {...props} />
          </div>
        ) : authLoading || !techEmail || params.token ? (
          <Spinner />
        ) : (
          <Container style={{ marginTop: '20px', textAlign: 'center' }}>
            <Typography variant='subtitle1'>
              <i className='fas fa-exclamation'></i> {``}
              Oops - something didn't work correctly! Use the link in your email
              to try accessing the work order again.
            </Typography>
            <Typography variant='body2'>
              If all else fails, use the button at the top right to get in touch
              with us.
            </Typography>
          </Container>
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  isAuth: selectIsAuth(state),
  redirect: selectAuthRedirect(state),
  authLoading: selectAuthLoading(state),
  techEmail: selectTechEmail(state),
});

export default connect(mapStateToProps, {
  logout,
  sessionLogin,
  sessionResume,
  getCurrentTech,
  setToken,
})(PrivateRoute);
