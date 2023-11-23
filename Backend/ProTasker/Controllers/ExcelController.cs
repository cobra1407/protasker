using System.ComponentModel;
using BU.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using ProTasker.Enums;

namespace ProTasker.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ExcelController : ControllerBase
{
    private readonly IExcelService _excelService;
    
    public ExcelController(IExcelService excelService)
    {
        _excelService = excelService;
    }
    
    
    [HttpPost]
    public async Task<IActionResult> ExportExcel(List<Tache?> data)
    {
        try
        {
            return await _excelService.GenerateExcelFile(data);
        }
        catch (Exception e)
        {
            return BadRequest("Erreur lors de la génération du fichier Excel : " + e.Message);
        }
    }
}