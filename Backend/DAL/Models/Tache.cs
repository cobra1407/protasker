using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Tache
{
    public int Id { get; set; }

    public string Libelle { get; set; } = null!;

    public sbyte Statut { get; set; }

    public int? UtilisateurId { get; set; }

    public DateTime? DateDerniereModification { get; set; }

    public virtual Utilisateur? Utilisateur { get; set; }
}
