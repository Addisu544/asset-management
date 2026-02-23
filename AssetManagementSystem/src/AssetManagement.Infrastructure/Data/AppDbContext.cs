using AssetManagement.Domain.Entities;
using AssetManagement.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AssetManagement.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // DbSets
        public DbSet<Employee> Employees => Set<Employee>();
        public DbSet<Product> Products => Set<Product>();
        public DbSet<AssetTransaction> AssetTransactions => Set<AssetTransaction>();
        public DbSet<AssetGroup> AssetGroups => Set<AssetGroup>();
        public DbSet<AssetType> AssetTypes => Set<AssetType>();
        public DbSet<Department> Departments => Set<Department>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure entities here using Fluent API

            // -------------------------------
            // Employee
            // -------------------------------
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasIndex(e => e.UserId).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Status)
                      .HasConversion<int>()
                      .HasDefaultValue(EmployeeStatus.Active);

                entity.Property(e => e.CreatedAt)
                      .HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(e => e.Department)
                      .WithMany(d => d.Employees)
                      .HasForeignKey(e => e.DepartmentId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(e => e.Transactions)
                      .WithOne(t => t.Employee)
                      .HasForeignKey(t => t.EmployeeId);
            });

            // -------------------------------
            // Product
            // -------------------------------
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.HasIndex(p => p.TagNo).IsUnique();

                entity.Property(p => p.Status)
                      .HasConversion<int>()
                      .HasDefaultValue(ProductStatus.Free);

                entity.Property(p => p.CreatedAt)
                      .HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(p => p.AssetGroup)
                      .WithMany(g => g.Products)
                      .HasForeignKey(p => p.AssetGroupId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(p => p.AssetType)
                      .WithMany()
                      .HasForeignKey(p => p.AssetTypeId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(p => p.Transactions)
                      .WithOne(t => t.Product)
                      .HasForeignKey(t => t.ProductId);
            });

            // -------------------------------
            // AssetTransaction
            // -------------------------------
            modelBuilder.Entity<AssetTransaction>(entity =>
            {
                entity.HasKey(t => t.Id);

                entity.Property(t => t.TransactionType)
                      .HasConversion<int>();

                entity.Property(t => t.CreatedAt)
                      .HasDefaultValueSql("GETUTCDATE()");
            });

            // -------------------------------
            // AssetGroup
            // -------------------------------
            modelBuilder.Entity<AssetGroup>(entity =>
            {
                entity.HasKey(g => g.Id);
                entity.HasIndex(g => g.GroupName).IsUnique();
            });

            // -------------------------------
            // AssetType
            // -------------------------------
            modelBuilder.Entity<AssetType>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.HasOne(t => t.AssetGroup)
                      .WithMany(g => g.AssetTypes)
                      .HasForeignKey(t => t.GroupId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(t => new { t.GroupId, t.TypeName }).IsUnique();
            });

            // -------------------------------
            // Department
            // -------------------------------
            modelBuilder.Entity<Department>(entity =>
            {
                entity.HasKey(d => d.Id);
                entity.HasIndex(d => d.DepartmentName).IsUnique();
            });
        }
    }
}