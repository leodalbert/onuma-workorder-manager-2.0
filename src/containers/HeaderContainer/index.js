import { connect } from 'react-redux';
import Header from './components/Header';
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

const mapDispatchToProps = {};

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;
