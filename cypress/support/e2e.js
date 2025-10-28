import 'cypress-axe';
import './commands';

import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

addMatchImageSnapshotCommand({
  failureThreshold: 0.2, // threshold for test to fail if change exceeds 0.2%
})
