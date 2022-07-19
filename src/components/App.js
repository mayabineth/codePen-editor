import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { SiCodesandbox } from "react-icons/si";
import { FaPen } from "react-icons/fa";
import { AiFillCloud, AiFillSetting } from "react-icons/ai";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="header">
        <div className="left-side-header">
          <button className="header-btn icon-btn">
            <SiCodesandbox />
          </button>
          <div className="header-flex-details">
            <div className="head">
              untitled
              <span>
                <FaPen />
              </span>
            </div>

            <div className="name">Josh Miller</div>
          </div>
        </div>
        <div className="right-side-header">
          <button className="btn">
            <span>
              <AiFillCloud />
            </span>
            save
          </button>
          <button className="btn">
            <span>
              <AiFillSetting />
            </span>
            settings
          </button>
        </div>
      </div>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
