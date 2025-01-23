export default function LoginPage() {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Connexion</h1>
        <p>Veuillez entrer vos informations de connexion</p>
      </div>
    );
  }
  
  // Désactiver le layout global pour cette page
  LoginPage.getLayout = (page: React.ReactNode) => page;
  