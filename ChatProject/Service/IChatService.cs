using ChatProject.Dto;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public interface IChatService
    {
        List<ChatDto> GetChatsByLogin( string login );
        List<MessageDto> GetChatMessages( int id );
        bool SaveMessage( MessageDto message );
        bool ChangeChatImage( int id, string path );
    }
}
