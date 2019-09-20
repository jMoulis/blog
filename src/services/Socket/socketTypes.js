import PropTypes from 'prop-types';
import SocketActions from './socketActions';

// eslint-disable-next-line import/prefer-default-export
export const socketTypes = () => ({
  socket: PropTypes.object,
  socketActions: PropTypes.instanceOf(SocketActions),
  socketStatus: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
    error: PropTypes.shape({
      reconnecting: PropTypes.shape({
        status: PropTypes.bool,
        message: PropTypes.string,
      }),
    }),
  }),
});
