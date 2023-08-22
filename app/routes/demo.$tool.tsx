import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";
import { fetchToolInfo } from "~/api/getUserToolInfo";
import Header from "~/component/Header";
import { toolList } from "~/constant";

export const loader: LoaderFunction = async ({ request, params }) => {
  let toolname = params.tool;
  toolname = toolname?.replace("_", " ");
  if (toolList.find((d) => d.name === toolname)) {
    let filtered = toolList.find((tool) => tool.name === toolname);
    let url = filtered?.demo;
    return {
      url,
      toolname,
    };
  }
};

function Tool() {
  const { url } = useLoaderData();
  const [loaded, setLoaded] = useState(false);
  const iframeRef = useRef(null);
  function onLoadFunction() {
    const iframe = iframeRef.current;
    if (iframe) {
    }
    setLoaded(true);
  }
  return (
    <>
      <Header />
      <div className="iframe-container">
        {!loaded && <Loading />}
        <iframe src={url} onLoad={onLoadFunction} ref={iframeRef}></iframe>
      </div>
    </>
  );
}

export default Tool;

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
      }}
    >
      loading.... wait for a moment
    </div>
  );
}