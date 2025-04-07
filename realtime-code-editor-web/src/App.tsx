import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel } from '@microsoft/signalr';
import Editor from '@monaco-editor/react';

export default function App() {
  const [code, setCode] = useState<string>("// Start coding here...");
  const [connection, setConnection] = useState<HubConnection | null>(null);

  // SignalR connection setup
  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5298/codehub", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();

    newConnection.start()
      .then(() => {
        newConnection.invoke("JoinRoom", "default-room")
          .catch((err: Error) => console.error('JoinRoom failed: ', err));
        console.log("SignalR Connected");
      })
      .catch((err: Error) => console.error('Connection failed: ', err));

    newConnection.on("ReceiveCodeUpdate", (newCode: string) => {
      setCode(newCode);
    });

    setConnection(newConnection);

    return () => {
      newConnection.off("ReceiveCodeUpdate");
      newConnection.stop()
        .catch((err: Error) => console.error('Disconnection failed: ', err));
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && connection) {
      setCode(value);
      connection.invoke("SendCodeUpdate", "default-room", value)
        .catch((err: Error) => console.error('Send failed: ', err));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Code Editor</h1>
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on"
        }}
      />
    </div>
  );
}