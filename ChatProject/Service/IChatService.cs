﻿using ChatProject.Dto;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public interface IChatService
    {
        bool IsHavePermission( int id, string login );
        ChatDto GetChatById( int id );
        List<ChatDto> GetChatsByLogin( string login );
        List<MessageDto> GetChatMessages( int id );
        bool SaveMessage( MessageDto message );
        bool ChangeChatImage( int id, string path );
        bool AddUserToChat( int id, string login );
        int AddChat( ChatDto chat );
        bool RemoveChat( int id );
    }
}
