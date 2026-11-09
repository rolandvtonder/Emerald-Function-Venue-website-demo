import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import {markIncoming} from './lib/nav';
import type {PageId} from './content';
import {Shell} from './components/Shell';
import {Home} from './pages/Home';
import {Weddings} from './pages/Weddings';
import {Functions} from './pages/Functions';
import {Venue} from './pages/Venue';
import {Contact} from './pages/Contact';
import './index.css';

// The hero's scroll beats depend on position; always start at the top.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// If we arrived through the page-change curtain, start covered (before first paint).
markIncoming();

const root = document.getElementById('root')!;
const page = (root.dataset.page ?? 'home') as PageId;

const views: Record<PageId, () => ReactNode> = {
  home: () => <Home />,
  weddings: () => <Weddings />,
  functions: () => <Functions />,
  venue: () => <Venue />,
  contact: () => <Contact />,
};

createRoot(root).render(
  <StrictMode>
    <Shell page={page}>{views[page]()}</Shell>
  </StrictMode>,
);
