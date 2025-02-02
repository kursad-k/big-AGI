import PsychologyIcon from '@mui/icons-material/Psychology';

import type { ICommandsProvider } from './ICommandsProvider';

export const CommandsReact: ICommandsProvider = {
  id: 'ass-react',
  rank: 15,

  getCommands: () => [{
    primary: '/react',
    description: 'Use the AI ReAct strategy to answer your query (as sidebar)',
    Icon: PsychologyIcon,
  }],

};
