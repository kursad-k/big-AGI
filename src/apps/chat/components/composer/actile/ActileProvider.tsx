import type { FunctionComponent } from 'react';

export interface ActileItem {
  id: string;
  label: string;
  description?: string;
  Icon?: FunctionComponent;
}

type ActileProviderIds = 'actile-commands' | 'actile-attach-reference';

export interface ActileProvider {
  id: ActileProviderIds;

  checkTriggerText: (trailingText: string) => boolean;

  fetchItems: () => Promise<ActileItem[]>;
  onItemSelect: (item: ActileItem) => void;
}
