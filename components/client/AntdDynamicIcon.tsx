/* //'use client';

import  * from '@ant-design/icons';
import loadable from '@loadable/component';

const AntdDynamicIcon = loadable((props) =>
	import(`@ant-design/icons/es/icons/${props.type}.js`).catch((err) => import(`@ant-design/icons/es/icons/WarningOutlined.js`))
);

export default AntdDynamicIcon;
//export const AntdDynamicIcon = (type: string) => {
//	const AntdIcon = AntdIcons[type]; // not AntdIcons[iconDetails.render] as @Cea mention;
//	return <AntdIcon />;
//};
 */
