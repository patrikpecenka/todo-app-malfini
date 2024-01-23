import { Group, Switch } from '@mantine/core';
import i18n from 'i18n';
import { FC, useEffect, useState } from 'react';

interface SwitchButtonProps {
  onToggle: (isChecked: boolean) => void;
}

const SwitchButton: FC<SwitchButtonProps> = ({ onToggle }) => {
  const storedValue = localStorage.getItem('isChecked');
  const [isChecked, setIsChecked] = useState(
    storedValue ? JSON.parse(storedValue) : false
  );

  const handleChangeLanguage = (newState: boolean) => {
    setIsChecked(newState);
    localStorage.setItem('isChecked', JSON.stringify(newState));

    if (!newState) {
      i18n.changeLanguage('cz');
      localStorage.setItem('language', 'cz');
    } else {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'eng');
    }
  };

  useEffect(() => {
    handleChangeLanguage(isChecked);
  }, [isChecked]);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    localStorage.setItem('isChecked', JSON.stringify(newState));

    onToggle(newState);
    handleChangeLanguage(newState);
  };

  return (
    <Group justify="center">
      <Switch
        size="lg"
        onLabel="EN"
        offLabel="CZ"
        checked={isChecked}
        onChange={handleToggle}
      />
    </Group>
  );
};

export default SwitchButton;