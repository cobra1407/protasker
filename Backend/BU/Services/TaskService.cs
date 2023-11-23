﻿using BU.Interfaces;
using DAL.Context;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace BU.Services;

public class TaskService : ITaskService
{
    private readonly ProtaskerContext _context;

    public TaskService(ProtaskerContext context)
    {
        _context = context;
    }
    
    public async Task<List<Tache>> GetTasks()
    {
        List<Tache> tasks = await _context.Taches.OrderByDescending(t => t.Id).ToListAsync();

        return tasks;
    }

    public async Task<Tache?> GetTaskById(int id)
    {
        return await _context.Taches.FindAsync(id);

    }

    public async Task<bool> AddTask(int? userId, string libelle, sbyte status)
    {
        Tache newTask = new Tache()
        {
            UtilisateurId = userId,
            Libelle = libelle,
            Statut = status,
        };

        _context.Taches.Add(newTask);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateTask(int taskId, int? userId, string libelle, sbyte status)
    {
        var task = await _context.Taches.SingleOrDefaultAsync((task => task.Id == taskId));

        if(task is  null)
            return false;
        
        try
        {
            task.UtilisateurId = userId;
            task.Libelle = libelle;
            task.Statut = status;
            
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            throw new Exception("Une erreur s'est produite pendant la modification de la tâche ", e);
        }
    }

    public async Task<bool> DeleteTask(int id)
    {
        var removedTask = await GetTaskById(id);

        if (removedTask is null)
            return false;

        try
        { 
            _context.Taches.Remove(removedTask);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            throw new Exception("Une erreur s'est produite pendant la suppression de la tâche ", e);
        }
    }
}
