// This file is loaded automatically before your test files.
import './commands';
// Browser-safe imports only below:
import 'cypress-axe';
// If the visual snapshot command is available, it will be added by the installed package's command import.
// We **do not** import any plugin or Node APIs here to avoid UnhandledSchemeError.
try {
  // Optional command registration (safe in browser bundle)
  // Older/newer versions may have different entry points; if missing, tests will auto-skip visual checks.
  require('@simonsmith/cypress-image-snapshot/command');
} catch (e) {
  // No-op, command not available. Visual spec will skip.
}
