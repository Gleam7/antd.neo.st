import { CheckboxOptionType } from 'antd';
import { StringKeyValue } from '@/types/KeyValue';

export const ConvertKeyValueToCheckboxOptionType = (pair: StringKeyValue[]): CheckboxOptionType[] => {
	return pair.map((item: StringKeyValue) => {
		return {
			label: item.value, //React.ReactNode;
			value: item.key, //T;
			//style?: React.CSSProperties;
			//disabled?: boolean;
			title: item.value, //string;
			id: item.key, //string;
			//onChange?: (e: CheckboxChangeEvent) => void;
			//required?: boolean;
		};
	});
};
