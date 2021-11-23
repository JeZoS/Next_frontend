import EventsItem from "@/components/EventsItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length == 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventsItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/api/events`);
  const events = await resp.json();
  return {
    props: {
      events: events.slice(0, 3),
    },
    revalidate: 1,
  };
}
