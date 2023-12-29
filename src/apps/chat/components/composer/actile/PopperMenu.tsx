import * as React from 'react';

import { Box, ListItemDecorator, MenuItem, Typography } from '@mui/joy';

import { CloseableMenu } from '~/common/components/CloseableMenu';

import { ActileItem } from './ActileProvider';


export function PopperMenu(props: {
  anchorEl: HTMLElement | null, onClose: () => void,
  popupItems: ActileItem[],
  onPopupItemSelect: (item: ActileItem) => void,
  children?: React.ReactNode
}) {

  // state
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // external state
  // const isMobile = useIsMobile();

  // derived state
  const items = props.popupItems;


  React.useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('handleKeyDown', event.key);
      if (event.key === '/')
        return;
      if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'ArrowLeft') {
        props.onClose();
      } else if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
      } else if (event.key === 'Enter' || event.key === 'Tab' || event.key === 'ArrowRight') {
        // TODO: continue...
        // onSelect(items[selectedIndex]);
      }
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [items, props, props.onClose, selectedIndex]);

  //
  // React.useEffect(() => {
  //   if (popupRef.current) {
  //     const selectedElement = popupRef.current.querySelector(`[data-index="${selectedIndex}"]`);
  //     selectedElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  //   }
  // }, [selectedIndex]);


  const hasAnyIcon = props.popupItems.some(item => !!item.Icon);

  return (
    <CloseableMenu open anchorEl={props.anchorEl} onClose={props.onClose} dense>

      {/*{!isMobile && <ListItem>*/}
      {/*  Press <KeyStroke combo='Esc' /> to close*/}
      {/*</ListItem>}*/}

      {props.popupItems.map((item, idx) =>
        <MenuItem
          key={item.id}
          variant={idx === selectedIndex ? 'soft' : undefined}
          onClick={() => props.onPopupItemSelect(item)}
        >
          {hasAnyIcon && <ListItemDecorator>
            {item.Icon ? <item.Icon /> : null}
          </ListItemDecorator>}
          <Box>
            <Typography level='title-sm' color='primary'>{item.label}</Typography>
            {!!item.description && <Typography level='body-xs'>{item.description}</Typography>}
          </Box>
        </MenuItem>,
      )}

      {props.children}

    </CloseableMenu>
  );
}