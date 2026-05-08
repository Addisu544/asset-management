**Asset Management System**

A production-oriented asset management platform built with .NET 8 and React, designed around secure asset lifecycle control, role-based access enforcement, and audit-ready transaction tracking.

**Overview**

This system centralizes how organizations manage assets across departments by enforcing structured workflows and clear ownership tracking.

Instead of loose CRUD operations, assets are handled through controlled state transitions (issue → return), ensuring:
- consistency
- traceability
- accountability

**Problem It Solves**
- Fragmented asset tracking across departments
- Lack of visibility into asset ownership
- No reliable audit trail for asset movement
- Risk of unauthorized operations

**Solution**
This application introduces a single source of truth for asset lifecycle management, backed by:
- strict API boundaries
- role-based access control (RBAC)
- transaction-driven workflows

 **Architecture** 
Designed using Clean Architecture principles:

API (Presentation Layer)

   **↓**

Application Layer (Use Cases / DTOs)

  **↓**

Domain Layer (Core Business Logic)

  **↓**

Infrastructure Layer (EF Core, DB, Security)



Key Design Decisions
- Separation of concerns across layers
- Business logic isolated from frameworks
- Explicit and predictable API contracts
- Scalable and maintainable structure

**Tech Stack**
**Backend**
- .NET 8 (Minimal API)
- Entity Framework Core
- SQL Server
- JWT Authentication
- BCrypt Password Hashing

**Frontend**
- React 19 + TypeScript
- Vite
- Material UI (MUI)
- React Router
- Axios
  
**Security**
- JWT-based authentication
- Role-Based Access Control (RBAC):
  - Employee
  - Asset Manager
  - Manager
- Protected API endpoints
- Secure password hashing

  
 **Core Features**
- Asset Lifecycle Management
- Issue and return assets with full transaction history
- Track ownership across departments and employees
- User & Department Management
- Manage employees and departments
- Assign assets with controlled permissions
- Transaction Tracking
- Every asset movement is recorded
- Audit-ready history for traceability
- File Uploads
- Store images for assets and employees

 
 **UI Highlights**
- Data tables with filtering and actions
- Role-based UI rendering
- Dialog-driven workflows (Create/Edit/View)
- Snackbar notifications for feedback

**Project Structure**
**Frontend**

src/

 ├── api/
 
 ├── components/
 
 ├── pages/
 
 ├── services/
 
 ├── context/
 
 ├── hooks/
 
 └── routes/

 
**Backend**

src/

 ├── AssetManagement.API
 
 ├── AssetManagement.Domain
 
 ├── AssetManagement.Application
 
 └── AssetManagement.Infrastructure


**Getting Started**

**Backend**
```
cd AssetManagementSystem
dotnet restore
dotnet run
```

**Frontend**
```
cd asset-management-frontend
npm install
npm run dev
```

**Key Highlights**
- Clean Architecture implementation
- Lifecycle-driven domain modeling
- RBAC enforced at API boundary
- Audit-focused relational design
- Fullstack TypeScript + .NET integration

🔗 Repository

GitHub:
  https://github.com/Addisu544/asset-management

DockerHub:
  https://hub.docker.com/repository/docker/addisu544/asset-managementsystem-api

**What Makes This Project Different**

It models real-world operational constraints:
- controlled workflows instead of free updates
- enforced security boundaries
- traceable system behavior
