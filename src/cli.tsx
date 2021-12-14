#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import { enterFullscreen, exitFullscreen } from './utils/terminalUtils.js';
import { App } from './App.js';

const { flags } = meow(
  `Usage: tui

Options:
  --fullscreen, -F
        Run in fullscreen.
        
  --legacy, -L  (or press l)
        Legacy mode.
        
  --quick [b|i|e|w,h,m], -Q [b|i|e|w,h,m] 
        TODO
`,
  {
    importMeta: import.meta,
    flags: {
      fullscreen: {
        type: `boolean`,
        alias: `F`,
      },
      legacy: {
        type: `boolean`,
        alias: `L`,
      },
      quick: {
        type: `string`,
        alias: `Q`,
      },
    },
  }
);

export type CliFlagsType = Partial<typeof flags>;

const number = `[1-9][0-9]*`;
if (flags.quick) {
  const match = flags.quick.match(`^(?<width>${number}),(?<height>${number}),(?<mines>${number})$|^(?<diff>[b|i|e])$`);
  if (!match) {
    console.error(`--quick must be either one of [b|i|e] or [w,h,m], see --help for details.`);
    process.exit(2);
  } else {
    const { width, height, mines, diff } = match.groups!;
    if (diff) {
      console.log(diff);
    } else {
      console.log(width, height, mines);
    }
  }
}

flags.fullscreen && enterFullscreen();
const { clear, waitUntilExit } = render(<App fullscreen={flags.fullscreen} />, {
  exitOnCtrlC: false,
});
waitUntilExit().then(() => flags.fullscreen && exitFullscreen());

export { clear };
