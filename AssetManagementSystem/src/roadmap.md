# 🏢 Asset Management System

(.NET 8 + React + Clean Architecture -- Professional Edition)

------------------------------------------------------------------------

# 🚨 IMPORTANT RULES

-   This roadmap is **strictly sequential**
-   ✅ Data before APIs\
-   ✅ Auth before features\
-   ✅ Backend fully complete before frontend\
-   ✅ Business rules enforced at service level\
-   ❌ No skipping stages

You move to the next phase only after checking all boxes.

------------------------------------------------------------------------

# 🧱 PHASE 0 --- Project Foundation (Professional Setup)

> Goal: Clean structure. Stable environment. No chaos later.

------------------------------------------------------------------------

## 🔹 Task 0.1 -- Solution Structure

-   [ ] Create main solution folder: `AssetManagementSystem`
-   [ ] Create `src` folder
-   [ ] Create 4 projects:
    -   [ ] `AssetManagement.Domain`
    -   [ ] `AssetManagement.Application`
    -   [ ] `AssetManagement.Infrastructure`
    -   [ ] `AssetManagement.API`
-   [ ] Add project references properly
-   [ ] Set API as startup project

✅ Confirm: - Solution builds successfully - No dependency errors

------------------------------------------------------------------------

## 🔹 Task 0.2 -- Base Infrastructure Setup

-   [ ] Install EF Core packages
-   [ ] Install SQL Server provider
-   [ ] Install JWT packages
-   [ ] Install BCrypt
-   [ ] Install Swagger
-   [ ] Configure connection string
-   [ ] Add basic DbContext
-   [ ] Enable Swagger

✅ Confirm: - API runs - Swagger loads - No DB connection errors

------------------------------------------------------------------------

# 🗄 PHASE 1 --- Database Design (DATA FIRST)

> Rule: Database must reflect business rules perfectly.

------------------------------------------------------------------------

## 🔹 Task 1.1 -- Finalize Entities (On Paper / Whiteboard)

Entities:

-   [ ] Employee
-   [ ] Product
-   [ ] AssetTransaction
-   [ ] AssetGroup
-   [ ] AssetType
-   [ ] Department

Enums:

-   [ ] ProductStatus (Free/Taken)
-   [ ] EmployeeStatus (Active/Inactive)
-   [ ] Role (Employee/Manager/AssetManager)
-   [ ] Level (Junior/Intermediate/Senior)
-   [ ] TransactionType (Issue/Return)

✅ Confirm: - Relationships are clear - All foreign keys defined -
Unique constraints identified (Email, TagNo, UserId)

------------------------------------------------------------------------

## 🔹 Task 1.2 -- Implement Domain Entities

In `Domain` layer:

-   [ ] Create entity classes
-   [ ] Create enums
-   [ ] Add navigation properties
-   [ ] Add default values (status, timestamps)

❌ No EF annotations\
❌ No database logic

Pure models only.

------------------------------------------------------------------------

## 🔹 Task 1.3 -- Configure EF Core (Infrastructure)

-   [ ] Create AppDbContext
-   [ ] Add DbSets
-   [ ] Configure relationships using Fluent API
-   [ ] Configure unique indexes
-   [ ] Configure enum conversions
-   [ ] Configure timestamps
-   [ ] Add initial migration
-   [ ] Update database

✅ Confirm: - Tables created in SQL Server - Constraints applied
correctly - Foreign keys valid

------------------------------------------------------------------------

# 🔐 PHASE 2 --- Authentication & Security (CRITICAL)

> This phase must be solid. Everything depends on it.

------------------------------------------------------------------------

## 🔹 Task 2.1 -- Password Hashing Service

-   [ ] Create IPasswordService interface
-   [ ] Implement BCryptPasswordService
-   [ ] Test hashing & verification manually

------------------------------------------------------------------------

## 🔹 Task 2.2 -- JWT Token Service

-   [ ] Create IJwtService
-   [ ] Implement JWT generation
-   [ ] Include:
    -   UserId
    -   Email
    -   Role
-   [ ] Configure JWT settings in appsettings.json
-   [ ] Configure JWT authentication middleware

------------------------------------------------------------------------

## 🔹 Task 2.3 -- Login Endpoint

-   [ ] Create AuthController
-   [ ] Implement Login
-   [ ] Validate:
    -   Email exists
    -   Password correct
    -   Status = Active
-   [ ] Return JWT

Test using Postman.

------------------------------------------------------------------------

## 🔹 Task 2.4 -- Authorization

-   [ ] Apply \[Authorize\]
-   [ ] Apply role-based authorization
-   [ ] Test:
    -   Employee access restrictions
    -   Manager access restrictions
    -   AssetManager access restrictions

✅ Confirm: - Unauthorized users blocked - Inactive users cannot login -
Role restrictions working

------------------------------------------------------------------------

# 👥 PHASE 3 --- Employee Module

------------------------------------------------------------------------

## 🔹 Task 3.1 -- Create Employee (AssetManager Only)

-   [ ] Create employee endpoint
-   [ ] Hash password
-   [ ] Default Status = Active
-   [ ] Assign Role
-   [ ] Validate unique email

------------------------------------------------------------------------

## 🔹 Task 3.2 -- Get Employees

-   [ ] Get all employees (Manager & AssetManager)
-   [ ] Get employee by Id
-   [ ] Get current logged-in profile

------------------------------------------------------------------------

## 🔹 Task 3.3 -- Update Employee

-   [ ] Update employee info
-   [ ] Change status (Active/Inactive)
-   [ ] Validate permissions

------------------------------------------------------------------------

## 🔹 Task 3.4 -- Profile Endpoint

-   [ ] Get profile of logged-in user
-   [ ] Hide password

✅ Confirm: - Only AssetManager can edit - Only active users allowed
operations

------------------------------------------------------------------------

# 📦 PHASE 4 --- Asset Group, Type & Department Setup

> These are master data tables.

------------------------------------------------------------------------

## 🔹 Task 4.1 -- Asset Groups CRUD (AssetManager)

-   [ ] Create
-   [ ] Get all
-   [ ] Update
-   [ ] Delete (if not referenced)

------------------------------------------------------------------------

## 🔹 Task 4.2 -- Asset Types CRUD

-   [ ] Create under group
-   [ ] Get by group
-   [ ] Update
-   [ ] Delete

------------------------------------------------------------------------

## 🔹 Task 4.3 -- Departments CRUD

-   [ ] Create
-   [ ] Get all
-   [ ] Update
-   [ ] Delete

------------------------------------------------------------------------

# 🖥 PHASE 5 --- Product Module

------------------------------------------------------------------------

## 🔹 Task 5.1 -- Create Product

-   [ ] Validate TagNo unique
-   [ ] Default Status = Free
-   [ ] Save image path
-   [ ] Save timestamp

------------------------------------------------------------------------

## 🔹 Task 5.2 -- Get Products

-   [ ] Get all (Manager & AssetManager)
-   [ ] Get own assigned products
-   [ ] Include related data (Group, Type)

------------------------------------------------------------------------

## 🔹 Task 5.3 -- Update Product

-   [ ] Edit product info
-   [ ] Validate business rules

------------------------------------------------------------------------

## 🔹 Task 5.4 -- Delete Product

-   [ ] Allow only if Status = Free
-   [ ] Restrict otherwise

✅ Confirm: - Cannot delete taken product - Cannot assign taken product

------------------------------------------------------------------------

# 🔄 PHASE 6 --- Transaction System (Core Logic)

> This is the heart of the system.

------------------------------------------------------------------------

## 🔹 Task 6.1 -- Issue Product

-   [ ] Validate employee is Active
-   [ ] Validate product is Free
-   [ ] Create Issue transaction
-   [ ] Update product status → Taken
-   [ ] Save IssuedBy

------------------------------------------------------------------------

## 🔹 Task 6.2 -- Return Product

-   [ ] Validate product is Taken
-   [ ] Create Return transaction
-   [ ] Update product status → Free

------------------------------------------------------------------------

## 🔹 Task 6.3 -- Transaction Queries

-   [ ] Get all transactions (Manager & AssetManager)
-   [ ] Get transactions by employee
-   [ ] Get transactions by product
-   [ ] Include necessary joined fields

------------------------------------------------------------------------

# 🧠 PHASE 7 --- Business Rule Hardening

-   [ ] Prevent double issue
-   [ ] Prevent return if not taken
-   [ ] Prevent inactive employee assignment
-   [ ] Add global exception middleware
-   [ ] Add validation handling
-   [ ] Add logging

------------------------------------------------------------------------

# 🎨 PHASE 8 --- Frontend Setup (After Backend 100% Complete)

------------------------------------------------------------------------

## 🔹 Task 8.1 -- Initialize React

-   [ ] Create Vite + React + TypeScript app
-   [ ] Install MUI
-   [ ] Install Axios
-   [ ] Install React Router

------------------------------------------------------------------------

## 🔹 Task 8.2 -- Authentication UI

-   [ ] Login page
-   [ ] Store JWT
-   [ ] Axios interceptor
-   [ ] Protected routes
-   [ ] Role-based routing

------------------------------------------------------------------------

## 🔹 Task 8.3 -- Layout Structure

-   [ ] Sidebar
-   [ ] Navbar
-   [ ] Role-based menu items

------------------------------------------------------------------------

## 🔹 Task 8.4 -- Feature Modules

Build in order:

1.  [ ] Employees UI
2.  [ ] Master Data UI
3.  [ ] Products UI
4.  [ ] Transactions UI
5.  [ ] Profile page

------------------------------------------------------------------------

# 🧪 PHASE 9 --- Final Professionalization

-   [ ] Add proper error messages
-   [ ] Improve UI consistency
-   [ ] Add loading states
-   [ ] Add confirmation dialogs
-   [ ] Add pagination
-   [ ] Seed initial AssetManager user
-   [ ] Write README.md
-   [ ] Add ER diagram image
-   [ ] Push to GitHub

------------------------------------------------------------------------

# 🎯 FINAL CHECKLIST (Before Portfolio Use)

-   [ ] Clean folder structure
-   [ ] No commented code
-   [ ] Proper commit history
-   [ ] API documented via Swagger
-   [ ] README explains architecture
-   [ ] Database diagram included
-   [ ] Screenshots included
-   [ ] Demo credentials provided

------------------------------------------------------------------------

# 🚀 RESULT

When completed, this project demonstrates:

-   Real Clean Architecture
-   Enterprise-level RBAC
-   Transactional system design
-   Secure authentication
-   Strong business logic enforcement
-   Professional frontend integration

This is not tutorial-level.

This is job-ready system-level work.
