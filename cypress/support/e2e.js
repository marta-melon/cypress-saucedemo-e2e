import 'cypress-axe';
import './commands';

import { addMatchImageSnapshotCommand } from '@simonsmith/cypress-image-snapshot/command'

addMatchImageSnapshotCommand({
  failureThreshold: 0.2,
})
