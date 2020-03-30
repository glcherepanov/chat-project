using ChatProject.Dto;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public class MessageHub : Hub
    {
        public async Task NewMessage(MessageDto msg)
        {
            await Clients.All.SendAsync("MessageReceived", msg);
        }
    }
}