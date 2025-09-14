import React from 'react';
import styles from './Admin.module.css';

const Admin = () => {
  return (
    <div className={styles.container}>
      <h1>Painel Administrativo</h1>
      <p>Esta área é restrita para administradores</p>
      <div className={styles.adminContent}>
        <section className={styles.section}>
          <h2>Agendamentos</h2>
          <p>Visualize e gerencie todos os agendamentos</p>
        </section>
        
        <section className={styles.section}>
          <h2>Usuários</h2>
          <p>Gerencie usuários do sistema</p>
        </section>
        
        <section className={styles.section}>
          <h2>Serviços</h2>
          <p>Edite os serviços oferecidos</p>
        </section>
      </div>
    </div>
  );
};

export default Admin;