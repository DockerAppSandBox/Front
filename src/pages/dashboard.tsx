import Layout from '../components/Layout';

export default function DashboardPage() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>Bienvenue sur votre tableau de bord.</p>
      </div>
    );
  }
  
  // Utilisation du layout global
  DashboardPage.getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
  