import Head from "next/head";
import Image from "next/image";
import Featured from "../components/Featured";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>La Maison Des Pizzas</title>
        <meta name="description" content="Pizzéria Marseillaise" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Featured />
    </div>
  );
}
