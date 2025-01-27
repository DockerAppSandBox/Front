import { AppShell, Text } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={{
        width: { base: 300 },
        breakpoint: 'sm',
        collapsed: { desktop: false, mobile: true },
      }}
      header={{ height: 60 }}
    >
      <AppShell.Navbar>
        <Text>Contenu de la barre de navigation</Text>
      </AppShell.Navbar>
      <AppShell.Header>
        <Text>Contenu de l'en-tête</Text>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
