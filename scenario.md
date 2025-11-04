# TokDesk v2 – Roles & Permissions Scenario

This document outlines the roles and permissions within the TokDesk v2 system. It describes each role's capabilities, responsibilities, and access levels across the system.

---

## 1️⃣ Super Admin – Permissions
**System Oversight and Control**
- **Company Management:**  
  - Monitor company activity.  
  - Suspend companies in case of violations.  
  - Temporarily or permanently delete companies if necessary.  
- **Global Statistics:**  
  - View total registered companies and overall user count.  
  - Access general system-level statistics.  
- **System Settings:**  
  - Manage global system policies.  
  - Configure system-wide notifications.  
- **Communication & Notifications:**  
  - Send alerts to all Admins for updates or critical issues.  
  - Monitor messages and issues between Super Admin and Admins.

> **Note:** Super Admin cannot create or modify companies. Their role is purely supervisory.

---

## 2️⃣ Admin (Within Company) – Permissions
**Company Setup and Management**
- **Company Creation:**  
  - Create a new company through a form capturing both company details and the initial Admin account.  
- **Department Management:**  
  - Create, edit, and delete departments.  
  - Assign department heads.  
- **Employee Management:**  
  - Add or edit employees.  
  - Enable/disable employee accounts.  
  - Soft delete or permanently delete employees.  
- **Project Management:**  
  - Create, edit, and delete projects.  
  - Assign employees to projects.  
- **Conversations:**  
  - Create company-wide or project-specific group chats.  
  - Edit or delete conversations as needed.  
- **Reports & Analytics:**  
  - Track department and project performance.  
  - Generate employee and ticket reports.  
- **Company Settings:**  
  - Manage templates, internal notifications, and company-specific policies.

---

## 3️⃣ Head of Department – Permissions
**Department-Level Control**
- **Conversation Management:**  
  - Create group chats for the department or project teams.  
  - Edit or delete conversations they created.  
  - Add or remove members from chats.  
- **Employee Oversight:**  
  - View employee data and performance reports.  
  - Cannot add or permanently delete employees.  
- **Project Access:**  
  - View projects under their department.  
  - Participate in project-related conversations.  
  - Cannot create new projects or assign employees.  
- **Reports & Analytics:**  
  - Access department-level performance reports only.

---

## 4️⃣ Employee – Permissions
**Daily Collaboration**
- **Individual & Group Chats:**  
  - Start 1:1 chats with colleagues within their department or project.  
  - Participate in existing group chats.  
  - Cannot create department-wide or project-wide group chats.  
- **Departments & Employees:**  
  - View colleagues within their department or project only.  
  - Cannot modify employee data or add new employees.  
- **Reports & Analytics:**  
  - Access only reports related to their own tasks and conversations.

---

## 5️⃣ Project Manager – Permissions
**Project-Specific Management**
- **Project Conversations:**  
  - Create small group chats within projects.  
  - Manage these chats: edit, delete, add/remove members.  
- **Project & Employee Access:**  
  - View only projects they are assigned to.  
  - Cannot create new projects or modify employee data.

---

## 6️⃣ Guest / External User – Permissions
**Limited Access**
- **Conversations:**  
  - Participate only in chats they are invited to.  
  - Create 1:1 chats with employees in shared conversations.  
  - Cannot create, modify, or delete group chats.  
- **Projects:**  
  - Access only projects they are invited to.  
- **Departments & Employees:**  
  - Cannot view other employees or departments outside invited projects/conversations.  
- **Reports & Analytics:**  
  - Access reports only for conversations or projects they are involved in.

---

**Note:** This document serves as the official scenario guide for TokDesk v2 and ensures proper role-based access control across the platform.
