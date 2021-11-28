import DashboardEvent from "@/components/DashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";
import moduleName from "@/styles/Dashboard.module.css";
import { useRouter } from "next/router";

export default function DashboardPAge({ events, token }) {
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  console.log(events);
  return (
    <Layout title="User Dashboard">
      <div className={moduleName.dash}></div>
      <h1>DashBoard</h1>
      <h3>My Events</h3>
      {events.map((evt) => (
        <DashboardEvent evt={evt} key={evt.id} handleDelete={deleteEvent} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
