import { useDispatch } from 'react-redux';
import styles from './Modal.module.css';

export const Modal = ({ title, icon, subtitle }) => {
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch({ type: 'CLOSE_MODAL' });
    };
    return (
        <div className={styles.container}>
            <section className={styles.modal}>
                {icon}
                <div className={styles.textContainer}>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                </div>
                <button onClick={onClose} className={styles.button}>
                    X
                </button>
            </section>
        </div>
    );
};