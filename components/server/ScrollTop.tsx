//import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

const ScrollTop = ({ children }: { children: ReactNode }) => {
	React.useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, []);

	return children || null;
};

//ScrollTop.propTypes = {
//	children: PropTypes.node,
//};

export default ScrollTop;
