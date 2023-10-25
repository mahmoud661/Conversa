import { useRouter } from "next/router";

function MyPage({ data, error }) {
  const router = useRouter();

  if (error) {
    // Handle the error case here, e.g., show an error message
    return <div>Error: {error}</div>;
  }

  // Render your component with the fetched data
  return (
    <div>
      {/* Use 'data' to render your content */}
      <h1>Data from Server</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

MyPage.getInitialProps = async (ctx) => {
  try {
    let url = ctx.req ? ctx.req.protocol + "://" + ctx.req.get("host") : "";
    const res = await fetch(url + "/dashboardData/", {
      headers: {
        cookie: ctx.req ? ctx.req.headers.cookie : null,
      },
    });
    const json = await res.json();

    if (json && json.error) {
      return { error: "Something went wrong" };
    }

    return {
      data: json.data,
    };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while fetching data" };
  }
};

export default MyPage;
