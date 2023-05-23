import styles from "./style.module.css";

 const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p >
                Coded with ❤️ by <a target="_blank" href="https://github.com/kuenmili" rel="noreferrer" className={styles.a}>Mili</a>
            </p>
        </footer>
    );
};

export default Footer;