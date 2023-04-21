import styles from './styles.module.scss';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { SplitPanelsProps } from './types';
import { Resizer } from './Resizer';

export const SplitPanels = ({ leftElement, rightElement }: SplitPanelsProps) => {
  return (
    <PanelGroup
      autoSaveId="panel"
      direction="horizontal"
    >
      <Panel
        defaultSize={50}
        minSize={40}
        className={styles.panel}
      >
        {leftElement}
      </Panel>

      {rightElement && (
        <>
          <PanelResizeHandle>
            <Resizer />
          </PanelResizeHandle>

          <Panel
            minSize={40}
            className={styles.panel}
          >
            {rightElement}
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};
