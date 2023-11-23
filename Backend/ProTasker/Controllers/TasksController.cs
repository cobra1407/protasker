using BU.Interfaces;
using BU.Services;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;

namespace ProTasker.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    [HttpGet]
    public async Task<IActionResult> GetTasks()
    {
        return Ok(await _taskService.GetTasks());
    }
    
    [HttpPost]
    public async Task<IActionResult> AddTask(int? userId, string libelle, sbyte status)
    {
        var result =  await _taskService.AddTask(userId, libelle, status);

        if (result)
            return Ok("Ajouté avec succès");

        return BadRequest(result);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateTask(int taskId, int? userId, string libelle, sbyte status)
    {
        if (await _taskService.GetTaskById(taskId) is null)
            return BadRequest("Cette tâche n'existe pas");

        var resut = await _taskService.UpdateTask(taskId, userId,libelle,status);
        
        if (resut)
            return Ok("Modifié avec succès");

        return BadRequest("une erreur s'est produite");

    }

    [HttpDelete]
    public async Task<IActionResult> DeleteTask(int taskId)
    {
        if (await _taskService.GetTaskById(taskId) is null)
            return BadRequest("Cette tâche n'existe pas");

        var result = await _taskService.DeleteTask(taskId);

        if (result)
            return Ok("Suppression réussie");

        return BadRequest("Une erreur s'est produite");
    }
    
}