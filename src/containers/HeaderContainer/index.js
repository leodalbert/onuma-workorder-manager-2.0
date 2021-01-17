import { connect } from 'react-redux';
import Header from './components/Header';
import { logout } from 'actions/auth';
import { selectTechToken, selectTechName } from 'Selectors/tech';
import { selectAuthUser, selectIsAuth, selectAuthToken } from 'Selectors/auth';

const mapStateToProps = (state) => ({
  token: selectTechToken(state),
  authToken: selectAuthToken(state),
  name: selectTechName(state),
  email: selectAuthUser(state),
  isAuth: selectIsAuth(state),
});

const mapDispatchToProps = { logout };

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
