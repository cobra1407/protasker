using DAL.Models;

namespace BU.Interfaces;

public interface ITaskService
{
    public Task<List<Tache>> GetTasks();

    public Task<Tache?> GetTaskById(int id);

    public Task<bool> AddTask(int? userId , string libelle , sbyte status);

    Task<bool> UpdateTask(int taskId, int? userId, string libelle, sbyte status);
    
    public Task<bool> DeleteTask(int id);

}