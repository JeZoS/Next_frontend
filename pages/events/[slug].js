import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "../../components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {evt.data} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url} width={960} height={600} alt="bruh" />
          </div>
        )}
        <h3>Performers</h3>
        <p>{evt.performers}</p>
        <h3>Description</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>
        <Link href="/events">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const resp = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await resp.json();
  return {
    props: {
      evt: events[0],
    },
  };
}
