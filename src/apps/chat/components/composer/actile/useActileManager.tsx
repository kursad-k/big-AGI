import * as React from 'react';
import { ActileItem, ActileProvider } from './ActileProvider';


export const useActileManager = (providers: ActileProvider[]) => {

  // state
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [popupItems, setPopupItems] = React.useState<ActileItem[]>([]);
  const [activeProvider, setActiveProvider] = React.useState<ActileProvider | null>(null);

  const checkForPopupTrigger = React.useCallback((text: string): boolean => {
    for (const rule of providers) {
      if (rule.checkTriggerText(text)) {
        setPopupVisible(true);
        rule.fetchItems().then(items => {
          setPopupItems(items);
          setActiveProvider(rule);
        }).catch(error => {
          console.error('Failed to fetch popup items:', error);
          // Handle error state here, e.g., show an error message
        });
        return true;
      }
    }
    return false;
  }, [providers]);

  const closePopup = React.useCallback(() => {
    setPopupVisible(false);
  }, []);

  const handlePopupItemSelect = React.useCallback((item: ActileItem) => {
    if (activeProvider) {
      activeProvider.onItemSelect(item);
      closePopup();
    }
  }, [activeProvider, closePopup]);


  return {
    popupVisible,
    popupItems,
    checkForPopupTrigger,
    handlePopupItemSelect,
    closePopup,
  };
};