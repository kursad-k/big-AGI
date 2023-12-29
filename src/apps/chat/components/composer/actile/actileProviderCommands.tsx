import { ActileItem, ActileProvider } from './ActileProvider';
import { findAllChatCommands } from '../../../commands/commands.registry';


export const actileProviderCommands: ActileProvider = {
  id: 'actile-commands',

  checkTriggerText: (trailingText: string) =>
    trailingText.trim() === '/',

  fetchItems: async () => {
    return findAllChatCommands().map((cmd) => ({
      id: cmd.primary,
      label: cmd.primary,
      description: cmd.description,
      Icon: cmd.Icon,
    }));
  },

  onItemSelect: (item: ActileItem) => {
    console.log('Selected item:', item);
  },
};