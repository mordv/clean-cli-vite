import React, { useCallback, useState } from 'react';
import Gradient from 'ink-gradient';
import { Box, Text, useInput, useStdout } from 'ink';
import { useStore } from '../state/state.js';
import InkSelectInput from 'ink-select-input';

// @ts-ignore
const SelectInput: typeof InkSelectInput = InkSelectInput.default;

export const MainMenu: React.VFC = () => {
  const mode = useStore((s) => s.mode);
  const switchMode = useStore((s) => s.switchMode);

  const { write } = useStdout();
  const handleSelect = useCallback((item) => write(item), [write]);

  useInput((i) => {
    i.toLowerCase() === `l` && switchMode();
  });
  useInput((_, { escape }) => {
    escape && switchMode();
  });

  return (
    <Box flexDirection={`column`} alignItems={`center`} justifyContent={`center`} width={`100%`}>
      <Text>Mode: {mode}</Text>
      <Box justifyContent={`center`} width={`100%`}>
        <Gradient name={`morning`}>
          <Text>MENU</Text>
        </Gradient>
      </Box>
      <Box height={1} />
      <SelectItem onSelect={handleSelect} />
      <Box height={1} />
    </Box>
  );
};

const types = [`one`, `two`, `three`] as const;

type ItemType = typeof types[number];
const items = types.map((value) => ({ value, label: value }));

const colors = [`teen`, `morning`, `instagram`];
const colorMapping = Object.fromEntries(items.map(({ label }, i) => [label, colors[i]]));

interface SelectItemProps {
  onSelect: (type: ItemType) => void;
}

const SelectItem: React.VFC<SelectItemProps> = ({ onSelect }) => {
  const [highlighted, setHighlighted] = useState(items[0].label);

  return (
    <SelectInput
      items={items}
      initialIndex={0}
      onSelect={(item) => onSelect(item.value)}
      onHighlight={(item) => setHighlighted(item.label as ItemType)}
      itemComponent={({ isSelected, label }) =>
        isSelected ? (
          <Gradient name={colorMapping[label] as never}>
            <Text>{label}</Text>
          </Gradient>
        ) : (
          <Text>{label}</Text>
        )
      }
      indicatorComponent={({ isSelected }) => (
        <Gradient name={colorMapping[highlighted] as never}>
          <Text>{isSelected ? `❯ ` : `  `}</Text>
        </Gradient>
      )}
    />
  );
};
