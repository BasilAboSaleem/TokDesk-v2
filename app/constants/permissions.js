// constants/permissions.js

const PERMISSIONS = {
  // Company Level Permissions
  COMPANY: {
    CREATE: 'company:create',
    UPDATE: 'company:update',
    DELETE: 'company:delete',
    APPROVE_REGISTRATION: 'company:approve_registration',
    REJECT_REGISTRATION: 'company:reject_registration',
    SUSPEND: 'company:suspend',
    VIEW_STATS: 'company:view_stats',
    CONFIGURE_SETTINGS: 'company:configure_settings'
  },

  // Department Level Permissions
  DEPARTMENT: {
    CREATE: 'department:create',
    UPDATE: 'department:update',
    DELETE: 'department:delete',
    ASSIGN_HEAD: 'department:assign_head',
    VIEW_REPORTS: 'department:view_reports'
  },

  // Employee/User Permissions
  EMPLOYEE: {
    CREATE: 'employee:create',
    UPDATE: 'employee:update',
    DELETE: 'employee:delete',
    SOFT_DELETE: 'employee:soft_delete',
    VIEW: 'employee:view',
    VIEW_REPORTS: 'employee:view_reports'
  },

  // Project Permissions
  PROJECT: {
    CREATE: 'project:create',
    UPDATE: 'project:update',
    DELETE: 'project:delete',
    ASSIGN_EMPLOYEES: 'project:assign_employees',
    VIEW: 'project:view'
  },

  // Conversation / Chat Permissions
  CONVERSATION: {
    CREATE: 'conversation:create',
    UPDATE: 'conversation:update',
    DELETE: 'conversation:delete',
    JOIN: 'conversation:join',
    PARTICIPATE: 'conversation:participate'
  },

  // Reports & Statistics
  REPORTS: {
    VIEW_COMPANY: 'reports:view_company',
    VIEW_DEPARTMENT: 'reports:view_department',
    VIEW_PROJECT: 'reports:view_project',
    VIEW_EMPLOYEE: 'reports:view_employee'
  },

  // Notifications / Communication
  NOTIFICATIONS: {
    SEND_SYSTEM: 'notifications:send_system',
    SEND_COMPANY: 'notifications:send_company'
  },

  // Audit / Logs
  AUDIT: {
    VIEW: 'audit:view',
    CREATE: 'audit:create'
  }
};

// Roles mapping to permissions
const ROLE_PERMISSIONS = {
  SUPER_ADMIN: [
    // Company
    PERMISSIONS.COMPANY.APPROVE_REGISTRATION,
    PERMISSIONS.COMPANY.REJECT_REGISTRATION,
    PERMISSIONS.COMPANY.SUSPEND,
    PERMISSIONS.COMPANY.DELETE,
    PERMISSIONS.COMPANY.VIEW_STATS,
    PERMISSIONS.COMPANY.CONFIGURE_SETTINGS,

    // Notifications
    PERMISSIONS.NOTIFICATIONS.SEND_SYSTEM,
    PERMISSIONS.NOTIFICATIONS.SEND_COMPANY,

    // Audit
    PERMISSIONS.AUDIT.VIEW,
    PERMISSIONS.AUDIT.CREATE
  ],

  ADMIN: [
    // Department
    PERMISSIONS.DEPARTMENT.CREATE,
    PERMISSIONS.DEPARTMENT.UPDATE,
    PERMISSIONS.DEPARTMENT.DELETE,
    PERMISSIONS.DEPARTMENT.ASSIGN_HEAD,
    PERMISSIONS.DEPARTMENT.VIEW_REPORTS,

    // Employee
    PERMISSIONS.EMPLOYEE.CREATE,
    PERMISSIONS.EMPLOYEE.UPDATE,
    PERMISSIONS.EMPLOYEE.DELETE,
    PERMISSIONS.EMPLOYEE.SOFT_DELETE,
    PERMISSIONS.EMPLOYEE.VIEW,
    PERMISSIONS.EMPLOYEE.VIEW_REPORTS,

    // Project
    PERMISSIONS.PROJECT.CREATE,
    PERMISSIONS.PROJECT.UPDATE,
    PERMISSIONS.PROJECT.DELETE,
    PERMISSIONS.PROJECT.ASSIGN_EMPLOYEES,
    PERMISSIONS.PROJECT.VIEW,

    // Conversations
    PERMISSIONS.CONVERSATION.CREATE,
    PERMISSIONS.CONVERSATION.UPDATE,
    PERMISSIONS.CONVERSATION.DELETE,
    PERMISSIONS.CONVERSATION.JOIN,
    PERMISSIONS.CONVERSATION.PARTICIPATE,

    // Reports
    PERMISSIONS.REPORTS.VIEW_COMPANY,
    PERMISSIONS.REPORTS.VIEW_DEPARTMENT,
    PERMISSIONS.REPORTS.VIEW_PROJECT,
    PERMISSIONS.REPORTS.VIEW_EMPLOYEE
  ],

  HEAD_OF_DEPARTMENT: [
    PERMISSIONS.DEPARTMENT.VIEW_REPORTS,
    PERMISSIONS.EMPLOYEE.VIEW,
    PERMISSIONS.EMPLOYEE.VIEW_REPORTS,
    PERMISSIONS.PROJECT.VIEW,
    PERMISSIONS.CONVERSATION.CREATE,
    PERMISSIONS.CONVERSATION.UPDATE,
    PERMISSIONS.CONVERSATION.DELETE,
    PERMISSIONS.CONVERSATION.PARTICIPATE,
    PERMISSIONS.REPORTS.VIEW_DEPARTMENT,
    PERMISSIONS.REPORTS.VIEW_PROJECT
  ],

  PROJECT_MANAGER: [
    PERMISSIONS.PROJECT.VIEW,
    PERMISSIONS.CONVERSATION.CREATE,
    PERMISSIONS.CONVERSATION.UPDATE,
    PERMISSIONS.CONVERSATION.DELETE,
    PERMISSIONS.CONVERSATION.PARTICIPATE,
    PERMISSIONS.REPORTS.VIEW_PROJECT,
    PERMISSIONS.EMPLOYEE.VIEW
  ],

  EMPLOYEE: [
    PERMISSIONS.CONVERSATION.JOIN,
    PERMISSIONS.CONVERSATION.PARTICIPATE,
    PERMISSIONS.EMPLOYEE.VIEW,
    PERMISSIONS.REPORTS.VIEW_PROJECT
  ],

  GUEST: [
    PERMISSIONS.CONVERSATION.JOIN,
    PERMISSIONS.CONVERSATION.PARTICIPATE
  ]
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS
};
