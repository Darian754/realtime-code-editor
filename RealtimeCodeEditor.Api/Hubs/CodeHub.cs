using Microsoft.AspNetCore.SignalR;
public class CodeHub : Hub
{
    public async Task SendCodeUpdate(string roomId, string newCode)
    {
        await Clients.Group(roomId).SendAsync("ReceiveCodeUpdate", newCode);
    }
    public async Task JoinRoom(string roomId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
    }
}