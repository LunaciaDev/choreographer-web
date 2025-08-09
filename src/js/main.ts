import { ChoreoConfig_init } from './core/choreo-config';
import { Manu_init } from './core/manu';
import { initDomRegistry } from './data/dom-registry';
import '../style.sass';
import { LogihubImport_init } from './core/logihub-import';
import { ShowResult_init } from './core/show-result';

document.addEventListener('DOMContentLoaded', () => {
    initDomRegistry();
    ChoreoConfig_init();
    LogihubImport_init();
    ShowResult_init();
    Manu_init();
});
