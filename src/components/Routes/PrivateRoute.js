import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { logout, sessionLogin, sessionResume, setToken } from 'actions/auth';
import { getCurrentTech } from 'actions/tech';
import {
  selectAuthToken,
  selectAuthUser,
  selectAuthLoading,
  selectIsAuth,
  selectAuthRedirect,
} from 'Selectors/auth';
import { selectTechId } from 'Selectors/tech';
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
  user,
  getCurrentTech,
  setToken,
  techId,
  location: { pathname },
  computedMatch: { params, url },
  component: Component,
  ...rest
}) => {
  const history = useHistory();

  // loggin logic
  useEffect(() => {
    // handle login for requester page - initial token login
    if (params.requesterEmail) {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      if (!isAuth && authLoading) {
        if (params.token) {
          // console.log('start requester session from param token');
          sessionLogin(
            params.studioId,
            params.requesterEmail,
            params.token,
            null,
            params.id,
            'requester'
          );
          // handle login for requester page - handle login if no token in url from local cookie (refreshing page ect...)
        } else if (cookie && cookie.email === params.requesterEmail) {
          // console.log('start requester session from cookie token');
          sessionLogin(
            params.studioId,
            params.requesterEmail,
            cookie.token,
            null,
            cookie.workorder,
            'requester'
          );
        } else {
          console.log('logout');
          logout();
        }
      }
    } else if (params.ccEmail) {
      // handle login for cc page - initial token login
      if (!isAuth && authLoading) {
        // console.log('start cc session');
        sessionLogin(
          params.studioId,
          params.ccEmail,
          null,
          pathname,
          params.id,
          'cc'
        );
      }
    } else {
      if (Cookies.get('onumaLocal')) {
        cookie = JSON.parse(atob(Cookies.get('onumaLocal')));
      }
      // handle login for technician page - initial token login
      if (!isAuth && authLoading) {
        if (params.token) {
          // console.log('start tech session from param token');
          sessionLogin(
            params.studioId,
            params.techEmail,
            params.token,
            pathname,
            null,
            'tech'
          );
          // handle login for technician page - handle login if no token in url from local cookie (refreshing page ect...)
        } else if (cookie && cookie.email === params.techEmail) {
          // console.log('start tech session from cookie token');
          sessionLogin(
            params.studioId,
            params.techEmail,
            cookie.token,
            pathname,
            null,
            'tech'
          );
        } else {
          console.log('logout');
          logout();
          // history.push(`${process.env.PUBLIC_URL}/${params.studioId}/logout`);
        }
      }
    }
  }, [isAuth, params, sessionLogin, pathname, logout, authLoading]);

  // set tech token in state and remove token from url
  useEffect(() => {
    if (params.token && isAuth) {
      // console.log('go');
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

  // redirect to login page if tech requires login
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

  // set true if tech page and tech has loaded
  let techForLogin = true;
  if (params.techEmail || (cookie && cookie.isTech === 'tech')) {
    techForLogin = false;
    if (techId) {
      techForLogin = true;
    }
  }

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth && user && techForLogin ? (
          <div>
            <Component {...props} />
          </div>
        ) : authLoading || !techForLogin ? (
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

PrivateRoute.propRypes = {
  token: PropTypes.string,
  isAuth: PropTypes.bool.isRequired,
  authLoading: PropTypes.bool.isRequired,
  redirect: PropTypes.string,
  sessionLogin: PropTypes.func.isRequired,
  sessionResume: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.string,
  getCurrentTech: PropTypes.func.isRequired,
  setToken: PropTypes.func.isRequired,
  location: PropTypes.object,
  computedMatch: PropTypes.object,
  Component: PropTypes.object,
};

const mapStateToProps = (state) => ({
  token: selectAuthToken(state),
  isAuth: selectIsAuth(state),
  redirect: selectAuthRedirect(state),
  authLoading: selectAuthLoading(state),
  user: selectAuthUser(state),
  techId: selectTechId(state),
});

export default connect(mapStateToProps, {
  logout,
  sessionLogin,
  sessionResume,
  getCurrentTech,
  setToken,
})(PrivateRoute);
