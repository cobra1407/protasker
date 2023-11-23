using System.ComponentModel;
using BU.Interfaces;
using DAL.Models;
using OfficeOpenXml;
using ProTasker.Enums;

namespace BU.Services;

public class ExcelService : IExcelService
{
    private readonly IUserService _userService;
    
    public ExcelService(IUserService userService)
    {
        _userService = userService;
    }
    
    private string GetStatutDescription(int statutValue)
    {
        Status status = (Status)statutValue;
        var field = status.GetType().GetField(status.ToString());
        var descriptionAttribute = (DescriptionAttribute)Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute));
        return descriptionAttribute?.Description ?? status.ToString();
    }
    

    public async Task<Microsoft.AspNetCore.Mvc.FileContentResult> GenerateExcelFile(List<Tache?> data)
    {
        try
        {
            using (ExcelPackage excelPackage = new ExcelPackage())
            {
                ExcelWorksheet worksheet = excelPackage.Workbook.Worksheets.Add("Tâches");
                
                var user = new Utilisateur();
                

                worksheet.Cells[1,1].Value = "Utilisateur";
                worksheet.Cells[1,2].Value = "Libellé";
                worksheet.Cells[1,3].Value = "Statut";
                
                //taille des colonnes
                worksheet.Column(1).Width = 20; // (Utilisateur)
                worksheet.Column(2).Width = 30; // (Libellé)
                worksheet.Column(3).Width = 15; // (Statut)
                
                int rowIndex = 2;
                
                foreach (var item in data)
                {
                    user = await _userService.GetUserById(item.UtilisateurId);
                    worksheet.Cells[rowIndex, 1].Value = user != null ? $"{user.Nom} {user.Prenom}" : " ";
                    worksheet.Cells[rowIndex, 2].Value = item.Libelle;
                    worksheet.Cells[rowIndex, 3].Value = GetStatutDescription(item.Statut);
                    rowIndex++;
                }
                
                // Convertir le contenu du fichier Excel en tableau de bytes
                byte[] excelContent = excelPackage.GetAsByteArray();    
                
                // Retourner le contenu du fichier Excel sous forme de FileContentResult
                return new Microsoft.AspNetCore.Mvc.FileContentResult(excelContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                {
                    FileDownloadName = "exported_data.xlsx"
                };
            }
        }
        catch (Exception e)
        {
            throw new Exception("Erreur lors de la génération du fichier Excel : " + e.Message);
        }
    }
}