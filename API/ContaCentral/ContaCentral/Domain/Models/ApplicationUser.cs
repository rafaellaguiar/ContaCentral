﻿using ContaCentral.Domain.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class ApplicationUser: IdentityUser<Guid>
    {
        public string CPF { get; set; }
        public string NomeCompleto { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Endereco { get; set; }
        public string Endereco2 { get; set; }
        public int Cep { get; set; }
        [JsonIgnore]
        public List<Carteira> ListCarteira { get; set; }

        public UserDTO UserDTO()
        {
            UserDTO userDTO = new UserDTO
            {
                Id = Id,
                UserName = UserName,
                Email = Email
            };
            
            return userDTO;
        }

    }
}
