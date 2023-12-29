import { ActileItem, ActileProvider } from './ActileProvider';


export const actileProviderAttachReference: ActileProvider = {
  id: 'actile-attach-reference',

  checkTriggerText: (trailingText: string) =>
    trailingText.endsWith(' @'),

  fetchItems: async () => {
    return [{
      id: 'test-1',
      label: 'Attach This',
      description: 'Attach this to the message',
      Icon: undefined,
    }];
  },

  onItemSelect: (item: ActileItem) => {
    console.log('Selected item:', item);
  },
};