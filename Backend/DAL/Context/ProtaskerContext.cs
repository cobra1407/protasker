using System;
using System.Collections.Generic;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL.Context;

public partial class ProtaskerContext : DbContext
{
    public ProtaskerContext()
    {
    }

    public ProtaskerContext(DbContextOptions<ProtaskerContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Tache> Taches { get; set; }

    public virtual DbSet<Utilisateur> Utilisateurs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", true, true)
                .Build();
            optionsBuilder.UseMySQL(config.GetConnectionString("ProtaskerDatabase") ?? string.Empty);
           
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tache>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("taches");

            entity.HasIndex(e => e.UtilisateurId, "utilisateur_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DateDerniereModification)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("date_derniere_modification");
            entity.Property(e => e.Libelle)
                .HasMaxLength(255)
                .HasDefaultValueSql("'0'")
                .HasColumnName("libelle");
            entity.Property(e => e.Statut).HasColumnName("statut");
            entity.Property(e => e.UtilisateurId).HasColumnName("utilisateur_id");

            entity.HasOne(d => d.Utilisateur).WithMany(p => p.Taches)
                .HasForeignKey(d => d.UtilisateurId)
                .HasConstraintName("taches_ibfk_1");
        });

        modelBuilder.Entity<Utilisateur>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("utilisateurs");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nom)
                .HasMaxLength(255)
                .HasColumnName("nom");
            entity.Property(e => e.Photo)
                .HasMaxLength(255)
                .HasColumnName("photo");
            entity.Property(e => e.Prenom)
                .HasMaxLength(255)
                .HasColumnName("prenom");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
