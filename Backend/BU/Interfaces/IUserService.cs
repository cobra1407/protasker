using DAL.Models;

namespace BU.Interfaces;

public interface IUserService
{
        public Task<List<Utilisateur>> GetUsers();

        public Task<Utilisateur?> GetUserById(int? userId);
}