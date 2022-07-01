import Image from "next/image";
import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" alt="" objectFit="cover" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h1 className={styles.title}>blabla</h1>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>adresse</h1>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>contact</h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
