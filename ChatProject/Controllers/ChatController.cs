using ChatProject.Dto;
using ChatProject.Service;
using EntityFramework.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ChatProject.Controllers
{
    [Route( "api/[controller]" )]
    public class ChatController : Controller
    {
        private readonly IChatService _service;

        public ChatController( IChatService service )
        {
            _service = service;
        }

        [HttpGet()]
        public ChatDto GetChat( int id )
        {
            return _service.GetChatById( id );
        }

        [HttpGet( "permission" )]
        public bool GetPermission( int id, string login )
        {
            return _service.IsHavePermission( id, login );
        }

        [HttpGet( "chats" )]
        public List<ChatDto> GetChats( string login )
        {
            return _service.GetChatsByLogin( login );
        }

        [HttpGet( "messages" )]
        public List<MessageDto> GetMessages( int id )
        {
            return _service.GetChatMessages( id );
        }

        [HttpPost( "send" )]
        public bool SendMessage( [FromBody] MessageDto message )
        {
            return _service.SaveMessage( message );
        }

        [HttpPost( "change-image" )]
        public bool ChangeImage( int id, string path )
        {
            return _service.ChangeChatImage( id, path );
        }

        [HttpPost( "add" )]
        public int AddChat( [FromBody] ChatDto chat )
        {
            return _service.AddChat( chat );
        }

        [HttpPost( "add-user" )]
        public bool AddUser( int id, string login )
        {
            return _service.AddUserToChat( id, login );
        }

        [HttpPost( "remove" )]
        public bool RemoveChat( int id )
        {
            return _service.RemoveChat( id );
        }
    }
}
