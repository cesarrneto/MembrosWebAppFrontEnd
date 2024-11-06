import React from 'react';
import styles from './HomePage.module.css';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from './logo.png';

function HomePage() {
    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo ICERJB" className={styles.logo} />
            <h1 className={styles.h1}>Bem-vindo à ICERJB</h1>
            <section>
                <h3 className={styles.h3}>Programação</h3>
                <div className={styles.sectionContent}>
                    <h5 className={styles.sectionH5}>Segunda-feira:</h5>
                    <p>IBCE: 19:30h às 21:30h</p>
                </div>
                <div className={styles.sectionContent}>
                    <h5 className={styles.sectionH5}>Quarta-feira</h5>
                    <p>Consagração: 08h às 10:30h</p>
                    <p>Oração: 19h</p>
                    <p>Culto da Família: 19:30h</p>
                </div>
                <div className={styles.sectionContent}>
                    <h5 className={styles.sectionH5}>Domingo</h5>
                    <p>Café da Manhã: 8h</p>
                    <p>EBD: 8:30h</p>
                    <p>Culto de Louvor e Adoração: 18h</p>
                </div>
                <div className={styles.sectionContent}>
                    <h5 className={styles.sectionH5}>Sexta-feira:</h5>
                    <p>IBCE: 19:30h às 21:30h</p>
                </div>
            </section>
            <section>
                <h3 className={styles.h3}>Conecte-se Conosco</h3>
                <div className={styles.sectionContent}>
                    <a href="https://www.instagram.com/icerjb" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnInstagram}`}>
                        <FaInstagram size={30} />
                    </a>
                    <a href="https://www.youtube.com/@icerjardimbotanico368" target="_blank" rel="noopener noreferrer" className={`${styles.btn} ${styles.btnYoutube}`}>
                        <FaYoutube size={30} />
                    </a>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
