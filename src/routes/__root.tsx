import { NotesProvider } from '@/client/providers/notes-provider';
import { ThemeProvider } from '@/client/providers/theme-provider';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Fragment } from 'react/jsx-runtime';

export const Route = createRootRoute({
  component: () => (
    <Fragment>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <NotesProvider>
          <Outlet />
        </NotesProvider>
      </ThemeProvider>
    </Fragment>
  ),
});
