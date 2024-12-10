import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '@/types';

type SettingsType = {
	themeColorPresets: ThemeColorPresets;
	themeMode: ThemeMode;
	themeLayout: ThemeLayout;
	themeCompact: boolean;
	themeStretch: boolean;
	breadCrumb: boolean;
	multiTab: boolean;
	darkSidebar: boolean;
};
type SettingStore = {
	settings: SettingsType;
	// Use the actions namespace to store all actions
	actions: {
		setSettings: (settings: SettingsType) => void;
		clearSettings: () => void;
	};
};

const useSettingStore = create<SettingStore>()(
	persist(
		(set) => ({
			settings: {
				themeColorPresets: ThemeColorPresets.Default,
				themeMode: ThemeMode.System,
				themeLayout: ThemeLayout.Vertical,
				themeCompact: false,
				themeStretch: true,
				breadCrumb: true,
				multiTab: true,
				darkSidebar: false,
			},
			actions: {
				setSettings: (settings) => {
					set({ settings });
				},
				clearSettings() {
					useSettingStore.persist.clearStorage();
				},
			},
		}),
		{
			name: StorageEnum.Settings, // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
			partialize: (state) => ({ [StorageEnum.Settings]: state.settings }),
		}
	)
);

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
