import React from 'react';
import { CliFlagsType } from './cli';
import { Box } from 'ink';
import { useClearExit } from './hooks/useClearExit.js';
import { useScreenSize } from './hooks/useScreenSize.js';
import { MainMenu } from './components/MainMenu.js';

export const App: React.VFC<Pick<CliFlagsType, 'fullscreen'>> = ({ fullscreen }) => {
  useClearExit();
  const { width, height } = useScreenSize();

  return (
    <Box
      flexDirection={`column`}
      alignItems={`center`}
      justifyContent={`center`}
      width={width}
      marginTop={fullscreen ? undefined : 2}
      height={fullscreen ? height : undefined}
    >
      <MainMenu />
    </Box>
  );
};
