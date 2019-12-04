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
        public List<ChatDto> GetUser( string login )
        {
            return _service.GetChatsByLogin( login );
        }

        //[HttpPost( "add" )]
        //public bool AddUser( [FromBody] UserDto user )
        //{
        //   return _service.AddUser( user );
        //}
    }
}
