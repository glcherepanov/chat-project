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
        public List<ChatDto> GetChat( string login )
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

        //[HttpPost( "add" )]
        //public bool AddUser( [FromBody] UserDto user )
        //{
        //   return _service.AddUser( user );
        //}
    }
}
