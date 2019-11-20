﻿using ChatProject.Dto;
using EntityFramework.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatProject.Service
{
    public interface IUserServices
    {
        List<UserDto> GetUsers();
        void AddUser( User user );
        UserDto GetUser( int id );
    }
}
