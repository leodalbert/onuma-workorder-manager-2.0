import { connect } from 'react-redux';
import Header from './components/Header';
import { logout } from 'actions/auth';
import {
  selectTechToken,
  selectTechName,
  selectTechEmail,
} from 'Selectors/tech';

const mapStateToProps = (state) => ({
  token: selectTechToken(state),
  name: selectTechName(state),
  email: selectTechEmail(state),
});

const mapDispatchToProps = { logout };

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
