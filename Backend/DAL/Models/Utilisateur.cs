using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Utilisateur
{
    public int Id { get; set; }

    public string Nom { get; set; } = null!;

    public string Prenom { get; set; } = null!;

    public string Photo { get; set; } = null!;

    public virtual ICollection<Tache> Taches { get; set; } = new List<Tache>();
}
