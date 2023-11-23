using BU.Interfaces;
using DAL.Context;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BU.Services;

public class UserService : IUserService
{
    private readonly ProtaskerContext _context;

    public UserService(ProtaskerContext context)
    {
        _context = context;
    }
    
    public async Task<List<Utilisateur>> GetUsers()
    {
        return  await _context.Utilisateurs.ToListAsync();
    }

    public Task<Utilisateur?> GetUserById(int? userId)
    {
        return _context.Utilisateurs.SingleOrDefaultAsync(u => u.Id == userId);
    }
}