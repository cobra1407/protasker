using DAL.Models;

namespace BU.Interfaces;

public interface IExcelService
{
    Task<Microsoft.AspNetCore.Mvc.FileContentResult> GenerateExcelFile(List<Tache?> data);
}