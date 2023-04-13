import styles from './styles.module.scss';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { SplitPanelsProps } from './types';
import { Resizer } from './Resizer';

export const SplitPanels = ({ autoSaveId, left, right }: SplitPanelsProps) => {
  return (
    <PanelGroup
      direction="horizontal"
      autoSaveId={autoSaveId}
    >
      <Panel
        defaultSize={50}
        minSize={40}
        className={styles.panel}
      >
        {left}
      </Panel>

      {right && (
        <>
          <PanelResizeHandle>
            <Resizer />
          </PanelResizeHandle>

          <Panel
            minSize={40}
            className={styles.panel}
          >
            {right}
          </Panel>
        </>
      )}
    </PanelGroup>
  );
};
