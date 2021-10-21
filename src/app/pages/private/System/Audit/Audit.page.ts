import { connect } from 'react-redux';
import { compose } from 'recompose';
import AuditView from './Audit.view';

const mapStateToProps = (state: any) => ({
  role: state?.auth?.profile?.roles,
});

const enhancer = compose<any, any>(connect(mapStateToProps));

export default enhancer(AuditView);
