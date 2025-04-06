import { useEffect, useState } from 'react';
import { HttpTransportType, HubConnectionBuilder} from '@microsoft/signalr';

export default function App() {
  const [code, setCode] = useState("");
  const [connection, setConnection] = useState<null | any>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
  .withUrl("http://localhost:5298/codehub", {
    skipNegotiation: true,  // Add this line
    transport: HttpTransportType.WebSockets // Add this line
  })
  .build();

    newConnection.start()
      .then(() => newConnection.invoke("JoinRoom", "default-room"))
      .catch(console.error);

    setConnection(newConnection);
    return () => { newConnection.stop(); };
  }, []);

  useEffect(() => {
    connection?.on("ReceiveCodeUpdate", setCode);
  }, [connection]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Real-Time Editor</h1>
      <textarea
        value={code}
        onChange={(e) => connection?.invoke("SendCodeUpdate", "default-room", e.target.value)}
        style={{ width: '100%', height: '500px', fontFamily: 'monospace' }}
      />
    </div>
  );
}
