using Microsoft.AspNetCore.Mvc;
using BU.Interfaces;


namespace ProTasker.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var result =  await _userService.GetUsers();
        
        if (result.Count > 0)
        {
            return Ok(result);
        }

        return BadRequest("Aucuns utilisateur trouvé");
    }
    
}