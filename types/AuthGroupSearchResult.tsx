import { SearchResultBase } from '.';

export interface AuthGroupSearchResult extends SearchResultBase {
	auth_group_name: string;
	auth_group_menus: string[];
	auth_group_users: string[];
}
